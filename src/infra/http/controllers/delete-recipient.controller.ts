import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient-use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { RecipientDoesNotExistErrorMessageDTO } from '../dtos/recipient-does-note-exist-message.dto'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const paramsDeleteRecipientSchema = z.object({
  recipientId: z.string().uuid(),
})

type ParamsDeleteRecipient = z.infer<typeof paramsDeleteRecipientSchema>

@ApiBearerAuth()
@ApiTags('recipient')
@Controller('/recipients/:recipientId')
export class DeleteRecipientController {
  constructor(private deleteRecipientUseCase: DeleteRecipientUseCase) {}

  @Delete()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'recipientId',
    description: 'The recipient id',
    type: 'string',
  })
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized access',
  })
  @ApiBadRequestResponse({
    type: RecipientDoesNotExistErrorMessageDTO,
    description: 'recipient does not exist',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @Param(new ZodValidationPipe(paramsDeleteRecipientSchema))
    { recipientId }: ParamsDeleteRecipient,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.deleteRecipientUseCase.execute({
      recipientId,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }
  }
}
