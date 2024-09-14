import { Either, right } from "@/core/either";

interface GetOrderByIdUseCaseRequest {}

type GetOrderByIdUseCaseResponse = Either<null, {}>;
export class GetOrderByIdUseCase {
  async execute({}: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    return right({});
  }
}
