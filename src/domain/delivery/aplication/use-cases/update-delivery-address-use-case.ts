import { Either, right } from "@/core/either";

interface UseCaseRequest {}

type UseCaseResponse = Either<null, {}>;
export class UseCase {
  async execute({}: UseCaseRequest): Promise<UseCaseResponse> {
    return right({});
  }
}
