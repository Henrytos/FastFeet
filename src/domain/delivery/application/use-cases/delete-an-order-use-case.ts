import { Either, left, right } from "@/core/either";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { AdministratorsRepository } from "../repositories/administrators-repository";

interface DeleteAnOrderUseCaseRequest {
  orderId: string;
  adiministratorId: string;
}

type DeleteAnOrderUseCaseResponse = Either<
  OrderDoesNotExistError | AdministratorDoesNotExistError,
  {}
>;

export class DeleteAnOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private administratorsRepository: AdministratorsRepository
  ) {}

  async execute({
    orderId,
    adiministratorId,
  }: DeleteAnOrderUseCaseRequest): Promise<DeleteAnOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }

    const administratorDoesNotExist = !Boolean(
      await this.administratorsRepository.findById(adiministratorId)
    );
    if (administratorDoesNotExist) {
      return left(new AdministratorDoesNotExistError());
    }

    await this.ordersRepository.delete(order);

    // TODO: send email to the user

    return right({});
  }
}
