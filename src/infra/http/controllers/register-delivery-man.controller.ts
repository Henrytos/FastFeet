import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Roles } from '../guards/roles.decorator'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'

const registerDeliveryManBodySchema = z.object({
  name: z.string(),
  cpf: z.string().length(11),
  password: z.string().min(6).max(20),
})

type RegisterDeliveryManBody = z.infer<typeof registerDeliveryManBodySchema>

const validationZodPipe = new ZodValidationPipe(registerDeliveryManBodySchema)

@Controller('/deliveryman')
export class RegisterDeliveryManController {
  constructor(
    private readonly registerDeliveryManUseCase: RegisterDeliveryManUseCase,
  ) {}

  @Post()
  @Roles('ADMINISTRATOR')
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @CurrentUser() administrator: UserPayload,
    @Body(validationZodPipe) body: RegisterDeliveryManBody,
  ) {
    const { name, cpf, password } = body

    const result = await this.registerDeliveryManUseCase.execute({
      administratorId: administrator.sub,
      name,
      cpf,
      password,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case WrongCredentialsError:
          throw new BadRequestException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
