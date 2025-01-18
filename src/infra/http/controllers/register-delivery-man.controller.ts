import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Roles } from '../guards/roles.decorator'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { RolesGuards } from '../guards/roles.guards'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { DeliveryManBodyDTO } from '../dtos/delivery-man-body.dto'

const registerDeliveryManBodySchema = z.object({
  name: z.string(),
  cpf: z.string().length(11),
  password: z.string().min(6).max(20),
})

type RegisterDeliveryManBody = z.infer<typeof registerDeliveryManBodySchema>

const validationZodPipe = new ZodValidationPipe(registerDeliveryManBodySchema)

@ApiTags('deliveryman')
@ApiBearerAuth()
@Controller('/delivery-man')
export class RegisterDeliveryManController {
  constructor(
    private readonly registerDeliveryManUseCase: RegisterDeliveryManUseCase,
  ) {}

  @Post()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiBody({
    type: DeliveryManBodyDTO,
  })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized access',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Wrong credentials [cpf]',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse()
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
          throw new InternalServerErrorException()
      }
    }
  }
}
