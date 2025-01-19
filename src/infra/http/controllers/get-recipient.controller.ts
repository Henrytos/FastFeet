import { GetRecipientUseCase } from '@/domain/delivery/application/use-cases/get-recipient-use-case'
import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
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
import { RecipientPresenter } from '../presenters/recipient-presenter'
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

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
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
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
          throw new ConflictException(result.value.message)
        case AdministratorDoesNotExistError:
          throw new ConflictException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      recipient: RecipientPresenter.toHTTP(result.value.recipient),
    }
  }
}
