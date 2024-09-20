import { Either, left, right } from "@/core/either";
import { DeliveryAddressRepository } from "../repositories/delivery-address-repository";
import { DeliveryAddressDoesNotExistError } from "./errors/delivery-address-does-not-exist-error";
import { AdministratorsRepository } from "../repositories/administrators-repository";
import { AdministratorDoesNotExistError } from "./errors/administrator-does-not-exist-error";
import { DeliveryAddress } from "../../enterprise/entites/delivery-address";

interface UpdateDeliveryAddressUseCaseRequest {
  adminitratorId: string;
  deliveryAddresId: string;
  state?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  zip?: string | null;
  number?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

type UpdateDeliveryAddressUseCaseResponse = Either<
  DeliveryAddressDoesNotExistError | AdministratorDoesNotExistError,
  {}
>;

export class UpdateDeliveryAddressUseCase {
  constructor(
    private adminitratorsRepository: AdministratorsRepository,
    private deliveryAddressRepository: DeliveryAddressRepository
  ) {}

  async execute({
    adminitratorId,
    deliveryAddresId,
    state,
    city,
    neighborhood,
    street,
    zip,
    number,
    latitude,
    longitude,
  }: UpdateDeliveryAddressUseCaseRequest): Promise<UpdateDeliveryAddressUseCaseResponse> {
    const adminitrator = await this.adminitratorsRepository.findById(
      adminitratorId
    );
    if (!adminitrator) {
      return left(new AdministratorDoesNotExistError());
    }

    const deliveryAddress = await this.deliveryAddressRepository.findById(
      deliveryAddresId
    );
    if (!deliveryAddress) {
      return left(new DeliveryAddressDoesNotExistError());
    }

    deliveryAddress.state = state ?? deliveryAddress.state;
    deliveryAddress.city = city ?? deliveryAddress.city;
    deliveryAddress.neighborhood = neighborhood ?? deliveryAddress.neighborhood;
    deliveryAddress.street = street ?? deliveryAddress.street;
    deliveryAddress.zip = zip ?? deliveryAddress.zip;
    deliveryAddress.number = number ?? deliveryAddress.number;
    deliveryAddress.latitude = latitude ?? deliveryAddress.latitude;
    deliveryAddress.longitude = longitude ?? deliveryAddress.longitude;

    this.deliveryAddressRepository.save(deliveryAddress);

    return right({});
  }
}
