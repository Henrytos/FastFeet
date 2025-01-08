import { Public } from '@/infra/auth/public'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthenticateUserUseCase } from '@/domain/delivery/application/use-cases/authenticate-user-use-case'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthenticateBodyDto } from '../dtos/authenticate-body.dto'
import { AccessTokenResponseDto } from '../dtos/access-token-response.dto'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { WrongCredentialMessageDTO } from '../dtos/wrong-credential-error-message.dto'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string().min(6).max(20),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Public()
@ApiTags('sing in')
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Authenticated',
  type: AccessTokenResponseDto,
})
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Administrator or DeliveryMan does not exist',
  type: AdministratorDoesNotExistMessageDTO,
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal Server Error',
})
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: 'Wrong credentials',
  type: WrongCredentialMessageDTO,
})
@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post()
  @ApiBody({
    type: AuthenticateBodyDto,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async handler(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema,
  ) {
    const { cpf, password } = body

    const result = await this.authenticateUserUseCase.execute({
      cpf,
      password,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case WrongCredentialsError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      accessToken: result.value.accessToken,
    }
  }
}
