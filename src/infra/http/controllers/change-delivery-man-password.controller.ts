import { ChangeDeliveryManPasswordUseCase } from '@/domain/delivery/application/use-cases/change-delivery-man-password-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { Roles } from '../guards/roles.decorator'
import { RolesGuards } from '../guards/roles.guards'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { DeliveryManDoesNotExistMessageDTO } from '../dtos/delivery-man-does-not-exist-message.dto'

const validationPasswordSchema = z.string().min(6).max(20)

type ValidationPasswordSchema = z.infer<typeof validationPasswordSchema>

@ApiTags('deliveryman')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  type: AdministratorDoesNotExistMessageDTO,
})
@ApiBadRequestResponse({
  type: DeliveryManDoesNotExistMessageDTO,
})
@ApiInternalServerErrorResponse()
@Controller('/deliverymen/:deliveryManCpf/password')
export class ChangeDeliveryManPasswordController {
  constructor(
    private readonly changeDeliveryManPasswordUseCase: ChangeDeliveryManPasswordUseCase,
  ) {}

  @Patch()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiParam({
    name: 'deliveryManCpf',
    type: 'string',
    description: 'CPF do entregador',
    required: true,
    schema: {
      type: 'string',
      format: 'cpf',
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'password changed successfully',
  })
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
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'password changed successfully',
    }
  }
}
