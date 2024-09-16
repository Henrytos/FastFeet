import { Either, right } from "@/core/either";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";

interface RegisterDeliveryAddressUseCaseRequest {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  zip: string;
  number: string;
  latitude: number;
  longitude: number;
  administratorId: string;
}

type RegisterDeliveryAddressUseCaseResponse = Either<null, {}>;
export class RegisterDeliveryAddressUseCase {
  constructor(
    private readonly administratorsRepository: AdministratorsRepository,
    private readonly deliveryAddressRepository: DeliveryAddressRepository
  ) {}

  async execute({}: RegisterDeliveryAddressUseCaseRequest): Promise<RegisterDeliveryAddressUseCaseResponse> {
    return right({});
  }
}
