import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { FetchNearbyOrdersWithDistanceUseCase } from './fetch-nearby-orders'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { makeOrder } from '@/test/factories/make-order'
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'

describe('fetch nearby orders use case', () => {
  let sut: FetchNearbyOrdersWithDistanceUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )
    sut = new FetchNearbyOrdersWithDistanceUseCase(
      inMemoryDeliveryMansRepository,
      inMemoryOrdersRepository,
    )
  })

  it('should return nearby orders page one', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    })

    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      deliveryManId: deliveryMan.id,
    })

    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 1,
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      ordersWithDistance: expect.arrayContaining([
        expect.objectContaining({
          distanceInKms: expect.any(Number),
        }),
      ]),
    })
    if (result.isRight()) {
      const lengthByOrderWihDistance = result.value.ordersWithDistance.length
      expect(lengthByOrderWihDistance).toBe(1)
    }
  })

  it('should return nearby orders page one', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    })
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      deliveryManId: deliveryMan.id,
    })

    for (let quantityOrder: number = 1; quantityOrder <= 10; quantityOrder++) {
      inMemoryOrdersRepository.items.push(order)
    }

    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 1,
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const lengthByOrderWihDistance = result.value.ordersWithDistance.length
      expect(lengthByOrderWihDistance).toBe(10)
    }
  })

  it('should return nearby orders page two', async () => {
    const deliveryAddress = makeDeliveryAddress({
      latitude: -23.43205962293566,
      longitude: -46.572444118904926,
    })
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const order = makeOrder({
      deliveryAddressId: deliveryAddress.id,
      deliveryManId: deliveryMan.id,
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
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const lengthByOrderWihDistance = result.value.ordersWithDistance.length
      expect(lengthByOrderWihDistance).toBe(1)
    }
  })

  it('should return an empty array if there are no requests on the refined page', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const result = await sut.execute({
      from: {
        deliveryManLatitude: -24.00534152940272,
        deliveryManLongitude: -46.414032247689725,
      },
      page: 2,
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const lengthByOrderWihDistance = result.value.ordersWithDistance.length
      expect(lengthByOrderWihDistance).toBe(0)
    }
  })
})
