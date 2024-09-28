import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository';
import { UpdateDeliveryManByAdministratorUseCase } from './update-delivery-man-by-administrator';
import { FakeHashGenerator } from '@/test/cryptography/fake-hash-generator';
import { makeDeliveryMan } from '@/test/factories/make-delivery-man';
import { makeAdministrator } from '@/test/factories/make-administrator';
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository';
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { Cpf } from '../../enterprise/entities/value-object/cpf';

describe('update delivery use case', () => {
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let hashGenerator: FakeHashGenerator;
  let sut: UpdateDeliveryManByAdministratorUseCase;

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository();
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    hashGenerator = new FakeHashGenerator();

    sut = new UpdateDeliveryManByAdministratorUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
      hashGenerator,
    );
  });

  it('should be possible to update a delivery by administrator', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);
    const deliveryMan = makeDeliveryMan({
      administratorId: administrator.id,
      cpf: Cpf.createFromValue('12345678900'),
      name: 'john doe',
      password: '123456',
    });
    inMemoryAdministratorsRepository.items.push(administrator);
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      cpf: '00987654321',
      name: 'doe john',
      password: '654321',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryMansRepository.items).toHaveLength(1);
    expect(inMemoryDeliveryMansRepository.items[0]).toMatchObject({
      props: {
        cpf: Cpf.createFromValue('00987654321'),
        name: 'doe john',
      },
    });
  });

  it('should not be possible to update a delivery by administrator if delivery does not exist', async () => {
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      deliveryManId: 'non-existing-id',
      cpf: '00987654321',
      name: 'doe john',
      password: '654321',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError);
  });

  it('should not be possible to update a delivery by administrator if administrator does not exist', async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryMansRepository.items.push(deliveryMan);

    const result = await sut.execute({
      administratorId: 'non-existing-id',
      deliveryManId: deliveryMan.id.toString(),
      cpf: '00987654321',
      name: 'doe john',
      password: '654321',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError);
  });
});
