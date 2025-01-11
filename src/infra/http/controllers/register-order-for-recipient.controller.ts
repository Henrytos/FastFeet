import { RegisterDeliveryAddressUseCase } from '@/domain/delivery/application/use-cases/register-delivery-address-use-case'
import { RegisterOrderForRecipientUseCase } from '@/domain/delivery/application/use-cases/register-order-for-recipient-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import { DeliveryAddressDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error'
import { ApiHeader } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const paramsRegisterOrderSchema = z.object({
  recipientId: z.string().uuid(),
})
type ParamsRegisterOrder = z.infer<typeof paramsRegisterOrderSchema>

const bodyRegisterOrderSchema = z.object({
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  zip: z.string(),
  number: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})
type BodyRegisterOrder = z.infer<typeof bodyRegisterOrderSchema>

@Controller('/orders/:recipientId')
export class RegisterOrderForRecipientController {
  constructor(
    private readonly registerOrderUseCase: RegisterOrderForRecipientUseCase,
    private readonly registerDeliveryAddressUseCase: RegisterDeliveryAddressUseCase,
  ) {}

  @Post()
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Param(new ZodValidationPipe(paramsRegisterOrderSchema))
    { recipientId }: ParamsRegisterOrder,
    @Body(new ZodValidationPipe(bodyRegisterOrderSchema))
    body: BodyRegisterOrder,
    @CurrentUser() administrator: UserPayload,
  ) {
    const resultCreatedDeliveryAddress =
      await this.registerDeliveryAddressUseCase.execute({
        administratorId: administrator.sub,
        state: body.state,
        city: body.city,
        neighborhood: body.neighborhood,
        street: body.street,
        zip: body.zip,
        number: body.number,
        latitude: body.latitude,
        longitude: body.longitude,
      })

    if (resultCreatedDeliveryAddress.isLeft()) {
      throw new UnauthorizedException(
        resultCreatedDeliveryAddress.value.message,
      )
    }

    const result = await this.registerOrderUseCase.execute({
      administratorId: administrator.sub,
      recipientId,
      deliveryAddressId:
        resultCreatedDeliveryAddress.value.deliveryAddress.id.toString(),
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case DeliveryAddressDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException('An unexpected error occurred')
      }
    }

    return {
      message: 'Order registered successfully',
    }
  }
}
