import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface DeleteDeliveryManUseCaseRequest {
  deleviryManId: string;
  administratorId: string;
}
type DeleteDeliveryManUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  {}
>;

export class DeleteDeliveryManUseCase {
  constructor(private deliveryMansRepository: DeliveryMansRepository) {}

  async execute({
    deleviryManId,
    administratorId,
  }: DeleteDeliveryManUseCaseRequest): Promise<DeleteDeliveryManUseCaseResponse> {
    const deleviryMan = await this.deliveryMansRepository.findById(
      deleviryManId
    );

    if (!deleviryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (deleviryMan.administratorId.toString() != administratorId) {
      return left(new WrongCredentialsError());
    }

    await this.deliveryMansRepository.delete(deleviryMan);

    return right({});
  }
}
