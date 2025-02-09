import { CancelingRecipientOrderUseCase } from '@/domain/delivery/application/use-cases/canceling-recipient-order-use-case'
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { DeliveryManDoesNotExistMessageDTO } from '../dtos/delivery-man-does-not-exist-message.dto'
import { OrderDoesNotExistMessageDTO } from '../dtos/order-does-not-exists-message.dto'

const routeParamCancelingOrderSchema = z.object({
  orderId: z.string().uuid(),
})

type RouteParamCancelingOrder = z.infer<typeof routeParamCancelingOrderSchema>

@Controller('/orders/:orderId/canceling')
@ApiBearerAuth()
@ApiTags('orders')
export class CancelingRecipientOrderController {
  constructor(
    private readonly cancelingRecipientOrderUseCase: CancelingRecipientOrderUseCase,
  ) {}

  @Patch()
  @UseRolesGuards('DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Order canceled successfully' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: DeliveryManDoesNotExistMessageDTO,
  })
  @ApiBadRequestResponse({
    type: OrderDoesNotExistMessageDTO,
  })
  @ApiInternalServerErrorResponse()
  async handler(
    @Param(new ZodValidationPipe(routeParamCancelingOrderSchema))
    { orderId }: RouteParamCancelingOrder,
    @CurrentUser() deliveryMan: UserPayload,
  ) {
    const result = await this.cancelingRecipientOrderUseCase.execute({
      deliveryManId: deliveryMan.sub,
      orderId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case OrderDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'Order canceled successfully',
    }
  }
}
