import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/get-order-by-id-use-case'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { OrderPresenter } from '../presenters/order-presenter'
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
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
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
      order: OrderPresenter.toHTTP(result.value.order),
    }
  }
}
