import { GetRecipientUseCase } from '@/domain/delivery/application/use-cases/get-recipient-use-case'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import { RecipientPresenter } from '../presenters/recipient-presenter'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { RecipientDTO } from '../dtos/recipient.dto'
import { RecipientDoesNotExistErrorMessageDTO } from '../dtos/recipient-does-note-exist-message.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'

const getRecipientParamsSchema = z.object({
  recipientId: z.string().uuid(),
})

type GetRecipientParams = z.infer<typeof getRecipientParamsSchema>

@ApiTags('recipient')
@ApiBearerAuth()
@Controller('/recipients/:recipientId')
export class GetRecipientController {
  constructor(private getRecipientUseCase: GetRecipientUseCase) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'recipientId',
    type: 'string',
    required: true,
    format: 'uuid',
  })
  @ApiOkResponse({
    type: RecipientDTO,
    description: 'Recipient details',
  })
  @ApiBadRequestResponse({
    type: RecipientDoesNotExistErrorMessageDTO,
    description: 'Recipient does not exist',
  })
  @ApiBadRequestResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
  async handler(
    @Param(new ZodValidationPipe(getRecipientParamsSchema))
    { recipientId }: GetRecipientParams,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.getRecipientUseCase.execute({
      recipientId,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      recipient: RecipientPresenter.toHTTP(result.value.recipient),
    }
  }
}
