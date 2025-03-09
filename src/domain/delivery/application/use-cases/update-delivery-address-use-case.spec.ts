import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { UpdateDeliveryAddressUseCase } from './update-delivery-address-use-case'
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'

describe('update delivery address use case', () => {
  let sut: UpdateDeliveryAddressUseCase
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    sut = new UpdateDeliveryAddressUseCase(
      inMemoryAdministratorsRepository,
      inMemoryDeliveryAddressRepository,
    )
  })

  it('should be possible to update address', async () => {
    const deliveryAddress = makeDeliveryAddress({
      city: 'são paulo',
    })
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      deliveryAddressId: deliveryAddress.id.toString(),
      administratorId: administrator.id.toString(),
      city: 'Rio De janeiro',
      latitude: 123,
      longitude: 123,
      neighborhood: 'Copacabana',
      number: '123',
      state: 'RJ',
      street: 'Rua 1',
      zip: '123',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryDeliveryAddressRepository.items[0]).toMatchObject({
      props: {
        city: 'Rio De janeiro',
      },
    })
  })

  it("shouldn't be possible to update an address if it doesn't exist", async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      deliveryAddressId: 'invalid-delivery-address-id',
      administratorId: administrator.id.toString(),
      city: 'Rio De janeiro',
      latitude: 123,
      longitude: 123,
      neighborhood: 'Copacabana',
      number: '123',
      state: 'RJ',
      street: 'Rua 1',
      zip: '123',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(DeliveryAddressDoesNotExistError)
  })

  it('should not be possible to update the address if you are not an administrator', async () => {
    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const result = await sut.execute({
      deliveryAddressId: deliveryAddress.id.toString(),
      administratorId: 'invalid-administrator-id',
      city: 'Rio De janeiro',
      latitude: 123,
      longitude: 123,
      neighborhood: 'Copacabana',
      number: '123',
      state: 'RJ',
      street: 'Rua 1',
      zip: '123',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
