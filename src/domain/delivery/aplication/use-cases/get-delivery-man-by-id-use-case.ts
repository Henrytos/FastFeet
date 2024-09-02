import { Either, left, right } from "@/core/either";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { DeliveryMan } from "../../enterprise/entites/delivery-man";

interface GetDeliveryManByIdUseCaseRequest {
  deleviryManId: string;
  administratorId: string;
}
type GetDeliveryManByIdUseCaseResponse = Either<
  DeliveryManDoesNotExistError | WrongCredentialsError,
  { deliveryMan: DeliveryMan }
>;

export class GetDeliveryManByIdUseCase {
  constructor(private deliveryMansRepository: DeliveryMansRepository) {}

  async execute({
    deleviryManId,
    administratorId,
  }: GetDeliveryManByIdUseCaseRequest): Promise<GetDeliveryManByIdUseCaseResponse> {
    const deliveryMan = await this.deliveryMansRepository.findById(
      deleviryManId
    );

    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (deliveryMan.administratorId.toString() != administratorId) {
      return left(new WrongCredentialsError());
    }

    return right({ deliveryMan });
  }
}