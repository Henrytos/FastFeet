import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository';
import { UpdateDeliveryAddressUseCase } from './update-delivery-address-use-case';
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository';
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address';
import { makeAdministrator } from '@/test/factories/make-administrator';

describe('update delivery address use case', () => {
  let sut: UpdateDeliveryAddressUseCase;
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository;
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository;

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository();
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository();
    sut = new UpdateDeliveryAddressUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryAddressRepository,
    );
  });

  it('should be possible to update address', async () => {
    const deliveryAddress = makeDeliveryAddress({
      city: 'são paulo',
    });
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress);
    const administrator = makeAdministrator();
    inMemoryAdministratorsRepository.items.push(administrator);

    const result = await sut.execute({
      deliveryAddressId: deliveryAddress.id.toString(),
      administratorId: administrator.id.toString(),
      city: 'Rio De janeiro',
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryDeliveryAddressRepository.items[0]).toMatchObject({
      props: {
        city: 'Rio De janeiro',
      },
    });
  });

  it("shouldn't be possible to update an address if it doesn't exist", async () => {});

  it('should not be possible to update the address if you are not an administrator', async () => {});
});
