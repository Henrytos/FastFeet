import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/get-order-by-id-use-case'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { OrderPresenter } from '../presenters/order-presenter'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const routeParamsGetOrderSchema = z.object({
  orderId: z.string().uuid(),
})
type RouteParamsGetOrder = z.infer<typeof routeParamsGetOrderSchema>

@Controller('/orders/:orderId')
export class GetORderByIdController {
  constructor(private readonly getOrderByIdUseCase: GetOrderByIdUseCase) {}

  @Get()
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  async handler(
    @Param(new ZodValidationPipe(routeParamsGetOrderSchema))
    { orderId }: RouteParamsGetOrder,
  ) {
    const result = await this.getOrderByIdUseCase.execute({ orderId })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case OrderDoesNotExistError:
          throw new NotFoundException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      order: OrderPresenter.toHTTP(result.value.order),
    }
  }
}
