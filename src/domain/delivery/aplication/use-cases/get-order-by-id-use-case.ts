import { Either, left, right } from "@/core/either";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { Order } from "../../enterprise/entites/order";
import { OrdersRepository } from "../repositories/orders-repository";

interface GetOrderByIdUseCaseRequest {
  orderId: string;
}

type GetOrderByIdUseCaseResponse = Either<
  OrderDoesNotExistError,
  {
    order: Order;
  }
>;

export class GetOrderByIdUseCase {
  constructor(private ordersRespository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRespository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }

    return right({
      order,
    });
  }
}