import { FetchNearbyOrdersWithDistanceUseCase } from '@/domain/delivery/application/use-cases/fetch-nearby-orders'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { OrderWithDistancePresenter } from '../presenters/order-with-distance-presenter'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'

const queryFetchOrderNearbySchema = z.object({
  page: z.coerce.number().optional().default(1),
})

type QueryFetchOrderNearby = z.infer<typeof queryFetchOrderNearbySchema>
const validationQueryFetchNearby = new ZodValidationPipe(
  queryFetchOrderNearbySchema,
)

const bodyFetchOrderNearbySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

type BodyFetchOrderNearby = z.infer<typeof bodyFetchOrderNearbySchema>
const validationBodyFetchNearby = new ZodValidationPipe(
  bodyFetchOrderNearbySchema,
)

@Controller('orders/nearby')
@ApiTags('orders')
@ApiBearerAuth()
export class FetchOrderNearbyController {
  constructor(
    private readonly fetchNearbyOrdersWithDistanceUseCase: FetchNearbyOrdersWithDistanceUseCase,
  ) {}

  @Get()
  @UseRolesGuards('DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  async handler(
    @Query(validationQueryFetchNearby) { page }: QueryFetchOrderNearby,
    @Body(validationBodyFetchNearby)
    { latitude, longitude }: BodyFetchOrderNearby,
    @CurrentUser() deliveryMan: UserPayload,
  ) {
    const result = await this.fetchNearbyOrdersWithDistanceUseCase.execute({
      from: {
        deliveryManLatitude: latitude,
        deliveryManLongitude: longitude,
      },
      page,
      deliveryManId: deliveryMan.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    const ordersWithDistance = result.value.ordersWithDistance

    return {
      orders: ordersWithDistance.map(OrderWithDistancePresenter.toHTTP),
    }
  }
}
