import { SendingOrderToRecipientByDeliveryManUseCase } from '@/domain/delivery/application/use-cases/sending-order-to-recipient-by-delivery-person-use-case'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { DeliveryAddressDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const routeParamsSendingOrderSchema = z.object({
  orderId: z.string().uuid(),
})

type RouteParamsSendingOrder = z.infer<typeof routeParamsSendingOrderSchema>

@ApiBearerAuth()
@ApiTags('order')
@Controller('/orders/:orderId/pickup')
export class SendingOrderToRecipientByDeliveryManController {
  constructor(
    private readonly sendingOrderToRecipientByDeliveryManUseCase: SendingOrderToRecipientByDeliveryManUseCase,
  ) {}

  @Patch()
  @UseRolesGuards('DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Order sent to recipient successfully',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'DeliveryMan does not exist',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Order does not exist',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse()
  async handler(
    @Param(new ZodValidationPipe(routeParamsSendingOrderSchema))
    { orderId }: RouteParamsSendingOrder,
    @CurrentUser() deliveryMan: UserPayload,
  ) {
    const result =
      await this.sendingOrderToRecipientByDeliveryManUseCase.execute({
        deliveryManId: deliveryMan.sub,
        orderId,
      })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case OrderDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case DeliveryAddressDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }
    return {
      message: 'Order sent to recipient successfully',
    }
  }
}
