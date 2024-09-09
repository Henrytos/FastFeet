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
    const oreder = await this.ordersRepository.findById(orderId);
    if (!oreder) {
      return left(new OrderDoesNotExistError());
    }

    const administrator = await this.administratorsRepository.findById(
      adiministratorId
    );
    if (!administrator) {
      return left(new AdministratorDoesNotExistError());
    }

    await this.ordersRepository.delete(oreder);

    // TODO: send email to the user

    return right({});
  }
}
