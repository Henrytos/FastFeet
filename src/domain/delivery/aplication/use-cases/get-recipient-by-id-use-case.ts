import { Either, right } from "@/core/either";

interface GetRecipiientByIdUseCaseRequest {}

type GetRecipiientByIdUseCaseResponse = Either<null, {}>;
export class GetRecipiientByIdUseCase {
  async execute({}: GetRecipiientByIdUseCaseRequest): Promise<GetRecipiientByIdUseCaseResponse> {
    return right({});
  }
}
