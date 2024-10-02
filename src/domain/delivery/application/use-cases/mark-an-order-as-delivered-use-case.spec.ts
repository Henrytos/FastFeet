import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository';
import { makeOrder } from '@/test/factories/make-order';
import { MarkAnOrderAsDeliveredUseCase } from './mark-an-order-as-delivered-use-case';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository';
import { makeDeliveryMan } from '@/test/factories/make-delivery-man';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { InMemoryPhotosRepository } from '@/test/repositories/in-memory-photos-repository';
import { makePhoto } from '@/test/factories/make-photo';
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository';

describe('mark an order as delivered use case', () => {
  let sut: MarkAnOrderAsDeliveredUseCase;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let inMemoryPhotosRepository: InMemoryPhotosRepository;

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    inMemoryPhotosRepository = new InMemoryPhotosRepository();
    sut = new MarkAnOrderAsDeliveredUseCase(
      inMemoryOrdersRepository,
      inMemoryDeliveryMansRepository,
      inMemoryPhotosRepository,
    );
  });

  it('should be possible mark order with delivered', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'withdrawn',
      deliveryManId: deliveryMan.id,
      withdrawnAt: new Date(new Date().getDay() - 1),
    });
    inMemoryOrdersRepository.items.push(order);

    const photo = makePhoto();
    inMemoryPhotosRepository.items.push(photo);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      photoIds: [photo.id.toString()],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'delivered',
        deliveryAt: expect.any(Date),
      },
    });
  });

  it('should not be possible to make an order delivered if it was not you who withdrew', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'withdrawn',
      deliveryManId: deliveryMan.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: 'invalid-order-id',
      deliveryManId: deliveryMan.id.toString(),
      photoIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'withdrawn',
        deliveryAt: null,
      },
    });
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError);
  });

  it('should not be possible to make an order delivered if it was not you who withdrew', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'withdrawn',
      deliveryManId: deliveryMan.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: 'invalid-delivery-man-id',
      photoIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'withdrawn',
        deliveryAt: null,
      },
    });
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it('should not mark an order delivered if it has status canceled', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'canceled',
      deliveryManId: deliveryMan.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      photoIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'canceled',
        deliveryAt: null,
      },
    });
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not mark an order delivered if it is with the status ends', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'delivered',
      deliveryManId: deliveryMan.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      photoIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'delivered',
        deliveryAt: null,
      },
    });
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not mark a delivered order if it has pending status', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const order = makeOrder({
      status: 'pending',
      deliveryManId: deliveryMan.id,
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      photoIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'pending',
        deliveryAt: null,
      },
    });
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});