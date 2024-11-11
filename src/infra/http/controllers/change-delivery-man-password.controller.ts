import { ChangeDeliveryManPasswordUseCase } from '@/domain/delivery/application/use-cases/change-delivery-man-password-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { Roles } from '../guards/roles.decorator'

const validationPasswordSchema = z.string().min(6).max(20)

type ValidationPasswordSchema = z.infer<typeof validationPasswordSchema>

@Controller('/deliverymen/:deliveryManCpf/password')
export class ChangeDeliveryManPasswordController {
  constructor(
    private readonly changeDeliveryManPasswordUseCase: ChangeDeliveryManPasswordUseCase,
  ) {}

  @Patch()
  @Roles('ADMINISTRATOR')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('deliveryManCpf') deliveryManCpf: string,
    @Body('password', new ZodValidationPipe(validationPasswordSchema))
    password: ValidationPasswordSchema,
  ) {
    const result = await this.changeDeliveryManPasswordUseCase.execute({
      administratorId: user.sub,
      cpf: deliveryManCpf,
      password,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
