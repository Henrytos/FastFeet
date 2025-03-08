import { MarkAnOrderAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case'
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { PhotoDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/photo-does-not-exist-error'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

const routeParamsMarkAnOrderSchema = z.object({
  orderId: z.string().uuid(),
})
type RouteParamsMarkAnOrder = z.infer<typeof routeParamsMarkAnOrderSchema>

const bodyMarkAnOrderSchema = z.object({
  photoId: z.string().uuid(),
})
type BodyMarkAnOrder = z.infer<typeof bodyMarkAnOrderSchema>

@Controller('/orders/:orderId/delivered')
@ApiTags('order')
@ApiBearerAuth()
export class MarkAnOrderAsDeliveredController {
  constructor(
    private readonly markAnOrderAsDeliveredUseCase: MarkAnOrderAsDeliveredUseCase,
  ) {}

  @Patch()
  @UseRolesGuards('DELIVERY_MAN')
  async handler(
    @Param(new ZodValidationPipe(routeParamsMarkAnOrderSchema))
    { orderId }: RouteParamsMarkAnOrder,
    @Body(new ZodValidationPipe(bodyMarkAnOrderSchema))
    { photoId }: BodyMarkAnOrder,
    @CurrentUser() { sub: deliveryManId }: UserPayload,
  ) {
    const result = await this.markAnOrderAsDeliveredUseCase.execute({
      orderId,
      deliveryManId,
      photoId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case OrderDoesNotExistError:
          throw new NotFoundException(result.value.message)
        case PhotoDoesNotExistError:
          throw new NotFoundException(result.value.message)
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'Order marked as delivered successfully',
    }
  }
}
