import { Either, left, right } from "@/core/either";
import { OrdersRepository } from "../repositories/orders-repository";
import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";
import { DeliveryMansRepository } from "../repositories/delivery-mans-repository";
import { DeliveryManDoesNotExistError } from "./errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PhotosRepository } from "../repositories/photos-repository";
import { PhotoDoesNotExistError } from "./errors/photo-does-not-exist-error";
import { ORDER_STATUS } from "@/core/entities/order-status.enum";

export interface MarkAnOrderAsDeliveredUseCaseRequest {
  orderId: string;
  deliveryManId: string;
  photoId: string;
}
export type MarkAnOrderAsDeliveredUseCaseResponse = Either<
  | OrderDoesNotExistError
  | PhotoDoesNotExistError
  | DeliveryManDoesNotExistError
  | WrongCredentialsError,
  {}
>;

export class MarkAnOrderAsDeliveredUseCase {
  constructor(
    private orderRepository: OrdersRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private photosRepository: PhotosRepository,
  ) {}

  async execute({
    orderId,
    deliveryManId,
    photoId,
  }: MarkAnOrderAsDeliveredUseCaseRequest): Promise<MarkAnOrderAsDeliveredUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return left(new OrderDoesNotExistError());
    }

    const deliveryMan =
      await this.deliveryMansRepository.findById(deliveryManId);
    if (!deliveryMan) {
      return left(new DeliveryManDoesNotExistError());
    }

    if (order.deliveryManId?.toValue() != deliveryMan.id.toValue()) {
      return left(new WrongCredentialsError());
    }

    if (
      order.status === ORDER_STATUS.PENDING ||
      order.status === ORDER_STATUS.DELIVERED ||
      order.status === ORDER_STATUS.CANCELED
    ) {
      return left(new WrongCredentialsError());
    }

    const photo = await this.photosRepository.findById(photoId);
    if (!photo) {
      return left(new PhotoDoesNotExistError());
    }

    order.status = ORDER_STATUS.DELIVERED;
    order.deliveryAt = new Date();
    order.photoId = new UniqueEntityID(photoId);

    await this.orderRepository.save(order);

    return right({});
  }
}
