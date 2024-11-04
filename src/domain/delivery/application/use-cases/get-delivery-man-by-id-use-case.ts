import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { DeliveryMan } from "../../enterprise/entities/delivery-man";
import { Injectable } from "@nestjs/common";

interface GetDeliveryManByIdUseCaseRequest {
  deliveryManId: string;
}
type GetDeliveryManByIdUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  { deliveryMan: DeliveryMan }
>;

@Injectable()
export class GetDeliveryManByIdUseCase {
  constructor(
    private readonly deliveryMansRepository: DeliveryMansRepository
  ) {}

  async execute({
    deliveryManId,
  }: GetDeliveryManByIdUseCaseRequest): Promise<GetDeliveryManByIdUseCaseResponse> {
    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId);

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    return right({ deliveryMan });
  }
}
