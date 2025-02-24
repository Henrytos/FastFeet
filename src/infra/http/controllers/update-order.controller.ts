import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { UpdateOrderUseCase } from '@/domain/delivery/application/use-cases/update-order-use-case'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { UpdateDeliveryAddressUseCase } from '@/domain/delivery/application/use-cases/update-delivery-address-use-case'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const routeParamsUpdateOrderSchema = z.object({
  orderId: z.string().uuid(),
})

type RouteParamUpdateOrder = z.infer<typeof routeParamsUpdateOrderSchema>

const bodyUpdateOrderSchema = z.object({
  status: z.enum(['PENDING', 'DELIVERED', 'WITHDRAWN']),
  deliveryManId: z.string().uuid(),
  deliveryAt: z.string().transform((date) => new Date(date)),
  withdrawnAt: z.string().transform((date) => new Date(date)),
  address: z.object({
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    zip: z.string(),
    number: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
})

type BodyUpdateOrder = z.infer<typeof bodyUpdateOrderSchema>

@ApiTags('order')
@ApiBearerAuth()
@Controller('/orders/:orderId')
export class UpdateOrderCOntroller {
  constructor(
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly updateDeliveryAddressUseCase: UpdateDeliveryAddressUseCase,
  ) {}

  @Put()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'orderId',
    type: 'string',
    required: true,
    format: 'uuid',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['PENDING', 'DELIVERED', 'WITHDRAWN'],
          example: 'PENDING',
        },
        deliveryManId: {
          type: 'string',
          format: 'uuid',
          example: 'b8007c0c-3452-4d0b-912f-615c2a81b5e3',
        },
        deliveryAt: {
          type: 'string',
          format: 'date-time',
          example: new Date().toString(),
        },
        withdrawnAt: {
          type: 'string',
          format: 'date-time',
          example: new Date().toString(),
        },
        address: {
          type: 'object',
          properties: {
            state: { type: 'string' },
            city: { type: 'string' },
            neighborhood: { type: 'string' },
            street: { type: 'string' },
            zip: { type: 'string' },
            number: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
          required: [
            'state',
            'city',
            'neighborhood',
            'street',
            'zip',
            'number',
            'latitude',
            'longitude',
          ],
        },
      },
      required: ['status', 'deliveryManId', 'deliveryAt', 'address'],
      format: 'json',
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Order updated successfully' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async handler(
    @Param(new ZodValidationPipe(routeParamsUpdateOrderSchema))
    { orderId }: RouteParamUpdateOrder,
    @Body()
    {
      status,
      deliveryManId,
      deliveryAt,
      withdrawnAt,
      address,
    }: BodyUpdateOrder,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.updateOrderUseCase.execute({
      administratorId: administrator.sub,
      status: ORDER_STATUS[status],
      deliveryAt,
      deliveryManId,
      orderId,
      withdrawnAt,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case OrderDoesNotExistError:
          throw new NotFoundException(result.value.message)
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    const resultUpdateDeliveryAddress =
      await this.updateDeliveryAddressUseCase.execute({
        administratorId: administrator.sub,
        deliveryAddressId: result.value.order.deliveryAddressId.toString(),
        state: address.state,
        city: address.city,
        neighborhood: address.neighborhood,
        street: address.street,
        zip: address.zip,
        number: address.number,
        latitude: address.latitude,
        longitude: address.longitude,
      })

    if (resultUpdateDeliveryAddress.isLeft()) {
      switch (resultUpdateDeliveryAddress.value.constructor) {
        case OrderDoesNotExistError:
          throw new NotFoundException(resultUpdateDeliveryAddress.value.message)
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(
            resultUpdateDeliveryAddress.value.message,
          )
        case DeliveryManDoesNotExistError:
          throw new BadRequestException(
            resultUpdateDeliveryAddress.value.message,
          )
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'Order updated successfully',
    }
  }
}
