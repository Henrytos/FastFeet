import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { FetchDeliveryMansUseCase } from './fetch-delivery-man-use-case'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'

describe('fetch delivery man use case', () => {
  let inMemoryAdministratorsRepository: InMemoryDeliveryMansRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let sut: FetchDeliveryMansUseCase
  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryAdministratorsRepository = new InMemoryDeliveryMansRepository()
    sut = new FetchDeliveryMansUseCase(
      inMemoryDeliveryMansRepository,
      inMemoryAdministratorsRepository,
    )
  })

  it('should return to the list of delivery of the page', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 20;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({
      page: 1,
      perPage: 20,
      administratorId: administrator.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      deliveryMans: expect.arrayContaining([deliveryMan]),
    })
  })

  it('should return to the list of delivery of the page two', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 21;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
      administratorId: administrator.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('deliveryMans')
    expect(result.value).toMatchObject({
      deliveryMans: expect.arrayContaining([deliveryMan]),
    })
  })

  it('should not return delivery if they do not exist in that dertminated page', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 20;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
      administratorId: administrator.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('deliveryMans')
    expect(result.value).toMatchObject({
      deliveryMans: expect.arrayContaining([]),
    })
  })

  it('should not be possible to list delivery if I am not an administrator', async () => {
    const result = await sut.execute({
      page: 2,
      perPage: 20,
      administratorId: 'invalid-administrator-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
