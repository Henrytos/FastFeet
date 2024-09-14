import { Either, right } from "@/core/either";

interface UpdateRecipientUseCaseRequest {}

type UpdateRecipientUseCaseResponse = Either<null, {}>;
export class UpdateRecipientUseCase {
  async execute({}: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
    return right({});
  }
}
