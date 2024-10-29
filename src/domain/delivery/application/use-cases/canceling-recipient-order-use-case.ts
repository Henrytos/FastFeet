import { Either, left, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

interface CancelingRecipientOrderUseCaseRequest {
  administratorId: string;
  orderId: string;
}
type CancelingRecipientOrderUseCaseResponse = Either<
  OrderDoesNotExistError | AdministratorDoesNotExistError | NotAllowedError,
  {}
>;

export class CancelingRecipientOrderUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private orderRepository: OrdersRepository,
  ) {}

  async execute({
    administratorId,
    orderId,
  }: CancelingRecipientOrderUseCaseRequest): Promise<CancelingRecipientOrderUseCaseResponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId);

    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }
    if (order.status === "canceled") {
      return left(new NotAllowedError());
    }

    order.status = "canceled";
    await this.orderRepository.save(order);

    return right({});
  }
}
