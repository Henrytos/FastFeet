import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { RegisterRecipientUseCase } from '@/domain/delivery/application/use-cases/register-recipient-use-case'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { DeliveryAddressDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'

const registerRecipientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

type RegisterRecipientBody = z.infer<typeof registerRecipientBodySchema>

@Controller('/recipients')
export class RegisterRecipientController {
  constructor(private registerRecipientUseCase: RegisterRecipientUseCase) {}

  @Post()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Body(new ZodValidationPipe(registerRecipientBodySchema))
    recipient: RegisterRecipientBody,
    @CurrentUser() administrator: UserPayload,
  ) {
    const { email, name } = recipient
    const result = await this.registerRecipientUseCase.execute({
      name,
      email,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new ConflictException(result.value.message)
        case DeliveryAddressDoesNotExistError:
          throw new NotFoundException(result.value.message)
        case RecipientDoesNotExistError:
          throw new ConflictException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      message: 'recipient created',
    }
  }
}
