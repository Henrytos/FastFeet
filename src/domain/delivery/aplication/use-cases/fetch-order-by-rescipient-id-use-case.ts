import { Either, left, right } from "@/core/either";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { OrdersRepository } from "../repositories/orders-repository";
import { RecipientsRepository } from "../repositories/recipients-repository";
import { Order } from "../../enterprise/entites/order";

interface FetchOrderByRecipientIdUseCaseRequest {
  recipientId: string;
  page: number;
}

type FetchOrderByRecipientIdUseCaseResponse = Either<
  RecipientDoesNotExistError,
  { orders: Order[] }
>;

export class FetchOrderByRecipientIdUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private ordersRepository: OrdersRepository
  ) {}

  async execute({
    recipientId,
    page,
  }: FetchOrderByRecipientIdUseCaseRequest): Promise<FetchOrderByRecipientIdUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId);

    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    const orders = await this.ordersRepository.findManyOrdersByRecipientId(
      recipientId,
      page
    );

    return right({ orders });
  }
}
