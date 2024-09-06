import { Either, left, right } from "@/core/either";
import { OrdersRepository } from "../repositories/orders-repository";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface MarkAnOrderAsDeliveredUseCaseRequest {
  orderId: string;
  deliveryManId: string;
}
type MarkAnOrderAsDeliveredUseCaseResponse = Either<OrderDoesNotExistError, {}>;

export class MarkAnOrderAsDeliveredUseCase {
  constructor(
    private orderRespository: OrdersRepository,
    private deliveryMansRepository: DeliveryMansRepository
  ) {}

  async execute({
    orderId,
    deliveryManId,
  }: MarkAnOrderAsDeliveredUseCaseRequest): Promise<MarkAnOrderAsDeliveredUseCaseResponse> {
    const order = await this.orderRespository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }

    const deliveryMan = await this.deliveryMansRepository.findById(
      deliveryManId
    );
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (order.deliviryManId?.toValue() != deliveryMan.id.toValue()) {
      return left(new WrongCredentialsError());
    }

    if (
      order.status === "pending" ||
      order.status === "delivered" ||
      order.status === "canceled"
    ) {
      return left(new WrongCredentialsError());
    }

    order.status = "delivered";
    order.deliveryAt = new Date();
    await this.orderRespository.save(order);
    //TODO: send notification to recipient

    return right({});
  }
}
