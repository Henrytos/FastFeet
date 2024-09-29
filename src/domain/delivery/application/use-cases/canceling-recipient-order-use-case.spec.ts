import { makeAdministrator } from '@/test/factories/make-administrator';
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository';
import { CancelingRecipientOrderUseCase } from './canceling-recipient-order-use-case';
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository';
import { makeOrder } from '@/test/factories/make-order';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository';

describe('cancelling recipient order  use case', () => {
  let sut: CancelingRecipientOrderUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    );
    sut = new CancelingRecipientOrderUseCase(
      inMemoryAdministratorsRepository,
      inMemoryOrdersRepository,
    );
  });

  it('should be possible to cancel an order', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const order = makeOrder({
      status: 'pending',
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'canceled',
      },
    });
  });

  it('should not be possible to cancel an order if there is no assistant', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const order = makeOrder({
      status: 'pending',
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: 'invalid-administrator-id',
      orderId: order.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'pending',
      },
    });
  });

  it('should not be possible to cancel an order if there is no order', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const order = makeOrder({
      status: 'pending',
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      orderId: 'invalid-delivery-man-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'pending',
      },
    });
  });

  it('should not be possible to cancel an order if there is no order', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const order = makeOrder({
      status: 'canceled',
    });
    inMemoryOrdersRepository.items.push(order);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      orderId: order.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryOrdersRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'canceled',
        updatedAt: order.updatedAt,
      },
    });
  });
});
