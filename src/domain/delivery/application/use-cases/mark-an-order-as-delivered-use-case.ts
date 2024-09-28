import { Either, left, right } from '@/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { DeliveryMansRepository } from '../repositories/delivery-mans-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PhotosRepository } from '../repositories/photos-repository';

export interface MarkAnOrderAsDeliveredUseCaseRequest {
  orderId: string;
  deliveryManId: string;
  photoIds: string[];
}
export type MarkAnOrderAsDeliveredUseCaseResponse = Either<
  OrderDoesNotExistError,
  {}
>;

export class MarkAnOrderAsDeliveredUseCase {
  constructor(
    private orderRespository: OrdersRepository,
    private deliveryMansRepository: DeliveryMansRepository,
    private photosRepository: PhotosRepository,
  ) {}

  async execute({
    orderId,
    deliveryManId,
    photoIds,
  }: MarkAnOrderAsDeliveredUseCaseRequest): Promise<MarkAnOrderAsDeliveredUseCaseResponse> {
    const order = await this.orderRespository.findById(orderId);
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
      order.status === 'pending' ||
      order.status === 'delivered' ||
      order.status === 'canceled'
    ) {
      return left(new WrongCredentialsError());
    }

    if (photoIds.length === 0) {
      return left(new WrongCredentialsError());
    }

    const doesPhotosExists =
      await this.photosRepository.existsPhotoByIds(photoIds);
    if (!doesPhotosExists) {
      return left(new WrongCredentialsError());
    }

    order.status = 'delivered';
    order.deliveryAt = new Date();
    order.photoIds = photoIds.map((id) => new UniqueEntityID(id));

    await this.orderRespository.save(order);

    return right({});
  }
}
