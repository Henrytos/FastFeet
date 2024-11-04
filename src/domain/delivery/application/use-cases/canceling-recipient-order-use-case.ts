import { Either, left, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ORDER_STATUS } from "@/core/entities/order-status.enum";

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
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly ordersRepository: OrdersRepository
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

    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }
    if (order.status === ORDER_STATUS.CANCELED) {
      return left(new NotAllowedError());
    }

    order.status = ORDER_STATUS.CANCELED;
    await this.ordersRepository.save(order);

    return right({});
  }
}
