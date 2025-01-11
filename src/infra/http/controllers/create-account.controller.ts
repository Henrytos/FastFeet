import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateUserBodyDTO } from '../dtos/create-user-body.dto'
import { WrongCredentialMessageDTO } from '../dtos/wrong-credential-error-message.dto'
import { AdministratorCreatedResponseDTO } from '../dtos/administrator-created-response.dto'
import { DeliveryManCreatedResponseDTO } from '../dtos/delivery-man-created-response.dto'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private readonly administratorRegistrationUseCase: AdministratorRegistrationUseCase,
    private readonly registerDeliveryManUseCase: RegisterDeliveryManUseCase,
  ) {}

  @Post('/admin')
  @ApiTags('Accounts')
  @ApiBearerAuth()
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiBody({ type: CreateUserBodyDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Administrator created successfully',
    type: AdministratorCreatedResponseDTO,
  })
  @ApiBadRequestResponse({
    type: WrongCredentialMessageDTO,
    description: 'Administrator already exists',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  async handlerCreateAdmin(
    @Body(new ZodValidationPipe(createUserBodySchema))
    body: CreateUserBodySchema,
  ) {
    const { name, cpf, password } = body

    const result = await this.administratorRegistrationUseCase.execute({
      name,
      cpf,
      password,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'administrator created successfully',
    }
  }

  @Post('/user')
  @ApiTags('Accounts')
  @ApiBearerAuth()
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiBody({ type: CreateUserBodyDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Delivery man created successfully',
    type: DeliveryManCreatedResponseDTO,
  })
  @ApiBadRequestResponse({
    type: WrongCredentialMessageDTO,
    description: 'Administrator already exists',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  async handlerCreateUser(
    @Body(new ZodValidationPipe(createUserBodySchema))
    body: CreateUserBodySchema,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const { name, cpf, password } = body
    const result = await this.registerDeliveryManUseCase.execute({
      name,
      cpf,
      password,
      administratorId: currentUser.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new ConflictException(result.value.message)
        default:
          throw new BadRequestException(result.value.message)
      }
    }

    return {
      message: 'delivery man created successfully',
    }
  }
}
