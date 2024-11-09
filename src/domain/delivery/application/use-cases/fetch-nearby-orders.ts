import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface FetchNearbyOrdersUseCaseRequest {
  from: {
    deliveryManLongitude: number
    deliveryManLatitude: number
  }
  page: number
}

type FetchNearbyOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[]
  }
>

export class FetchNearbyOrdersUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    from,
    page,
  }: FetchNearbyOrdersUseCaseRequest): Promise<FetchNearbyOrdersUseCaseResponse> {
    const ordersNearby = await this.ordersRepository.fetchManyNearby(
      {
        longitude: from.deliveryManLongitude,
        latitude: from.deliveryManLatitude,
      },
      page,
    )

    return right({
      orders: ordersNearby,
    })
  }
}
