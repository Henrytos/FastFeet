import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/get-order-by-id-use-case'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { OrderBodyDTO } from '../dtos/order-body.dto'
import { OrderDoesNotExistMessageDTO } from '../dtos/order-does-not-exists-message.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { OrderWithDetailsPresenter } from '../presenters/order-with-details-presenter'

const routeParamsGetOrderSchema = z.object({
  orderId: z.string().uuid(),
})
type RouteParamsGetOrder = z.infer<typeof routeParamsGetOrderSchema>

@ApiTags('order')
@ApiBearerAuth()
@Controller('/orders/:orderId')
export class GetORderByIdController {
  constructor(private readonly getOrderByIdUseCase: GetOrderByIdUseCase) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR', 'DELIVERY_MAN')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'orderId',
    type: 'string',
    required: true,
    format: 'uuid',
  })
  @ApiOkResponse({
    type: OrderBodyDTO,
    description: 'Order details',
  })
  @ApiBadRequestResponse({
    type: OrderDoesNotExistMessageDTO,
    description: 'Order not found',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
  async handler(
    @Param(new ZodValidationPipe(routeParamsGetOrderSchema))
    { orderId }: RouteParamsGetOrder,
  ) {
    const result = await this.getOrderByIdUseCase.execute({ orderId })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case OrderDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      orderWithDetails: OrderWithDetailsPresenter.toHTTP(
        result.value.orderWithDetails,
      ),
    }
  }
}
