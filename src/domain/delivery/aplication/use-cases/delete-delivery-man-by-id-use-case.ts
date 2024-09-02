import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface DeleteDeliveryManByIdUseCaseRequest {
  deliveryManId: string;
  administratorId: string;
}
type DeleteDeliveryManByIdUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  {}
>;

export class DeleteDeliveryManByIdUseCase {
  constructor(private deliveryMansRepository: DeliveryMansRepository) {}

  async execute({
    deliveryManId,
    administratorId,
  }: DeleteDeliveryManByIdUseCaseRequest): Promise<DeleteDeliveryManByIdUseCaseResponse> {
    const deliveryMan = await this.deliveryMansRepository.findById(
      deliveryManId
    );

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (deliveryMan.administratorId.toString() != administratorId) {
      return left(new WrongCredentialsError());
    }

    await this.deliveryMansRepository.delete(deliveryMan);

    return right({});
  }
}
