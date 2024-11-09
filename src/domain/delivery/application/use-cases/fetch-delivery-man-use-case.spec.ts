import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { FetchDeliveryMansUseCase } from './fetch-delivery-man-use-case'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'

describe('fetch delivery man use case', () => {
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let sut: FetchDeliveryMansUseCase
  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    sut = new FetchDeliveryMansUseCase(inMemoryDeliveryMansRepository)
  })

  it('should return to the list of delivery of the page', async () => {
    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 20;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({ page: 1, perPage: 20 })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveryMans).toHaveLength(20)
  })

  it('should return to the list of delivery of the page two', async () => {
    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 21;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({ page: 2, perPage: 20 })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveryMans).toHaveLength(1)
  })

  it('should not return delivery if they do not exist in that dertminated page', async () => {
    const deliveryMan = makeDeliveryMan()

    for (
      let quantityDeliveryMan: number = 1;
      quantityDeliveryMan <= 20;
      quantityDeliveryMan++
    ) {
      inMemoryDeliveryMansRepository.items.push(deliveryMan)
    }

    const result = await sut.execute({ page: 2, perPage: 20 })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveryMans).toHaveLength(0)
  })
})
