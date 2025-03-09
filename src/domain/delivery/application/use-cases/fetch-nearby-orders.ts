import { Either, left, right } from '@/core/either'
import { OrdersRepository } from '../repositories/orders-repository'
import { OrderWithDistance } from '../../enterprise/entities/value-object/order-with-distance'
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { Injectable } from '@nestjs/common'

interface FetchNearbyOrdersWithDistanceUseCaseRequest {
  from: {
    deliveryManLongitude: number
    deliveryManLatitude: number
  }
  page: number
  deliveryManId: string
}

type FetchNearbyOrdersWithDistanceUseCaseResponse = Either<
  DeliveryManDoesNotExistError,
  {
    ordersWithDistance: OrderWithDistance[]
  }
>

@Injectable()
export class FetchNearbyOrdersWithDistanceUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({
    from,
    page,
    deliveryManId,
  }: FetchNearbyOrdersWithDistanceUseCaseRequest): Promise<FetchNearbyOrdersWithDistanceUseCaseResponse> {
    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId)

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError())
    }

    const ordersNearbyWithDistance =
      await this.ordersRepository.fetchManyNearbyWithDistance(
        {
          longitude: from.deliveryManLongitude,
          latitude: from.deliveryManLatitude,
        },
        page,
      )

    return right({
      ordersWithDistance: ordersNearbyWithDistance,
    })
  }
}
