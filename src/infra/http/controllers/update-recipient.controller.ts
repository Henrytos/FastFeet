import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient-use-case'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'

const updateRecipientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})
type UpdateRecipientBody = z.infer<typeof updateRecipientBodySchema>

const updateRecipientParams = z.object({
  recipientId: z.string().uuid(),
})
type UpdateRecipientParams = z.infer<typeof updateRecipientParams>

@Controller('/recipients/:recipientId')
export class UpdateRecipientController {
  constructor(private updateRecipientUseCase: UpdateRecipientUseCase) {}

  @Put()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Body(new ZodValidationPipe(updateRecipientBodySchema))
    recipient: UpdateRecipientBody,
    @Param(new ZodValidationPipe(updateRecipientParams))
    { recipientId }: UpdateRecipientParams,
    @CurrentUser() administrator: UserPayload,
  ) {
    const { email, name } = recipient

    const result = await this.updateRecipientUseCase.execute({
      name,
      email,
      recipientId,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new ConflictException(result.value.message)
        case RecipientDoesNotExistError:
          throw new ConflictException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      message: 'recipient updated successfully',
    }
  }
}
