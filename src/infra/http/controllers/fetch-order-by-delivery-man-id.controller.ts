import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { Roles } from '../guards/roles.decorator'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RolesGuards } from '../guards/roles.guards'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchOrderByDeliveryManIdUseCase } from '@/domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case'
import { OrderPresenter } from '../presenters/order-presenter'
import { ApiHeader } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10),
})

type QueryParams = z.infer<typeof queryParamsSchema>

const routeParamsSchema = z.object({
  deliveryManId: z.string().uuid(),
})

type RouteParams = z.infer<typeof routeParamsSchema>

@Controller('/deliverymen/:deliveryManId/deliveries')
export class FetchOrderByDeliveryManIdController {
  constructor(
    private readonly fetchOrderByDeliveryManIdUseCase: FetchOrderByDeliveryManIdUseCase,
  ) {}

  @Get()
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @HttpCode(HttpStatus.OK)
  async handler(
    @Query(new ZodValidationPipe(queryParamsSchema))
    { page, perPage }: QueryParams,
    @Param(new ZodValidationPipe(routeParamsSchema))
    { deliveryManId }: RouteParams,
  ) {
    const result = await this.fetchOrderByDeliveryManIdUseCase.execute({
      page,
      perPage,
      deliveryManId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }

    return {
      user: result.value.orders.map(OrderPresenter.toHTTP),
    }
  }
}
