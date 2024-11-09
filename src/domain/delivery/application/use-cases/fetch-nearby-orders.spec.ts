import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { FetchNearbyOrdersUseCase } from './fetch-nearby-orders'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { makeOrder } from '@/test/factories/make-order'
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'

describe('fetch nearby orders use case', () => {
  let sut: FetchNearbyOrdersUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )
    sut = new FetchNearbyOrdersUseCase(inMemoryOrdersRepository)
  })

  it('should return nearby orders page one', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    })

    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
    })

    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 1,
    })

    expect(result.isRight()).toBe(true)
  })

  it('should return nearby orders page two', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    })

    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
    })

    for (let quantityOrder: number = 1; quantityOrder <= 21; quantityOrder++) {
      inMemoryOrdersRepository.items.push(order)
    }

    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.orders).toHaveLength(1)
  })

  it('should return an empty array if there are no requests on the refined page', async () => {
    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.orders).toHaveLength(0)
  })
})
