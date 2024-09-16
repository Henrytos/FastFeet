import { Either, left, right } from "@/core/either";
import { RecipientDoesNotExistError } from "./errors/recipient-does-not-exist-error";
import { Recipient } from "../../enterprise/entites/recipient";
import { RecipientsRepository } from "../repositories/recipients-repository";

interface GetRecipientByIdUseCaseRequest {
  recipientId: string;
}

type GetRecipientByIdUseCaseResponse = Either<
  RecipientDoesNotExistError,
  {
    recipient: Recipient;
  }
>;

export class GetRecipientByIdUseCase {
  constructor(private recipientsRespository: RecipientsRepository) {}

  async execute({
    recipientId,
  }: GetRecipientByIdUseCaseRequest): Promise<GetRecipientByIdUseCaseResponse> {
    const recipient = await this.recipientsRespository.findById(recipientId);
    if (!recipient) {
      return left(new RecipientDoesNotExistError());
    }

    return right({
      recipient,
    });
  }
}
