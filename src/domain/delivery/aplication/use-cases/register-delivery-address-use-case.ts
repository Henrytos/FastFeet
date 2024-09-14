import { Either, right } from "@/core/either";

interface RegisterDeliveryAddressUseCaseRequest {}

type RegisterDeliveryAddressUseCaseResponse = Either<null, {}>;
export class RegisterDeliveryAddressUseCase {
  async execute({}: RegisterDeliveryAddressUseCaseRequest): Promise<RegisterDeliveryAddressUseCaseResponse> {
    return right({});
  }
}
