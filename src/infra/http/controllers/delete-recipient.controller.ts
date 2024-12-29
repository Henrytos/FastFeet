import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient-use-case'
import {
  ConflictException,
  Controller,
  Delete,
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

const deleteRecipientParamsSchema = z.object({
  recipientId: z.string().uuid(),
})

type DeleteRecipientParams = z.infer<typeof deleteRecipientParamsSchema>

@Controller('/recipients/:recipientId')
export class DeleteRecipientController {
  constructor(private deleteRecipientUseCase: DeleteRecipientUseCase) {}

  @Delete()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @Param(new ZodValidationPipe(deleteRecipientParamsSchema))
    { recipientId }: DeleteRecipientParams,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.deleteRecipientUseCase.execute({
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
  }
}
