import { Either, right } from "@/core/either";
import { Order } from "../../enterprise/entities/order";
import { OrdersRepository } from "../repositories/orders-repository";

interface FetchNearbyOrdersUseCaseRequest {
  deliveryManLongitude: number;
  deliveryManLatitude: number;
}

type FetchNearbyOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

export class FetchNearbyOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    deliveryManLongitude,
    deliveryManLatitude,
  }: FetchNearbyOrdersUseCaseRequest): Promise<FetchNearbyOrdersUseCaseResponse> {
    const ordersNearby = await this.ordersRepository.findManyNearby({
      longitude: deliveryManLongitude,
      latitude: deliveryManLatitude,
    });

    return right({
      orders: ordersNearby,
    });
  }
}
