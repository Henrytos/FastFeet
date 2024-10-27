import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository';
import { FetchNearbyOrdersUseCase } from './fetch-nearby-orders';
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository';
import { makeOrder } from '@/test/factories/make-order';
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address';

describe('fetch nearby orders use case', () => {
  let sut: FetchNearbyOrdersUseCase;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    sut = new FetchNearbyOrdersUseCase(inMemoryOrdersRepository);
  });

  it('should return nearby orders', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    });

    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
    });

    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      deliveryManLatitude: -24.00534152940272,
      deliveryManLongitude: -46.414032247689725,
    });

    console.log(result.value.orders);
    expect(result.isRight()).toBe(true);
  });
});
