import { makeAdministrator } from '@/test/factories/make-administrator';
import { makeDeliveryMan } from '@/test/factories/make-delivery-man';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { GetDeliveryManByIdUseCase } from './get-delivery-man-by-id-use-case';
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository';
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository';

describe('get delivery man  use case', () => {
  let sut: GetDeliveryManByIdUseCase;
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();

    sut = new GetDeliveryManByIdUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
    );
  });

  it('should be possible to get a delivery by administrator', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      deliveryMan: deliveryMan,
    });
  });

  it('should not be possible to get a delivery man who does not exist', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: 'invalid-delivery-man-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });
});
