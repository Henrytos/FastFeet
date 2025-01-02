import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { FetchOrderByDeliveryManIdUseCase } from './fetch-order-by-delivery-man-id-use-case'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { makeOrder } from '@/test/factories/make-order'
import { ORDER_STATUS } from '@/core/entities/order-status.enum'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'

describe('fetch nearby orders use case', () => {
  let sut: FetchOrderByDeliveryManIdUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )

    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    sut = new FetchOrderByDeliveryManIdUseCase(
      inMemoryOrdersRepository,
      inMemoryDeliveryMansRepository,
    )
  })

  it('should return nearby orders page one', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    for (let i = 1; i <= 22; i++) {
      const order = makeOrder({
        deliveryManId: deliveryMan.id,
        status: ORDER_STATUS.PENDING,
      })

      inMemoryOrdersRepository.items.push(order)
    }

    const result = await sut.execute({
      deliveryManId: deliveryMan.id.toString(),
      page: 1,
      perPage: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      orders: expect.arrayContaining([
        expect.objectContaining({
          deliveryManId: deliveryMan.id,
        }),
      ]),
    })
  })

  it('should not return requests if you are not a delivery', async () => {
    const result = await sut.execute({
      deliveryManId: 'invalid-delivery-man-id',
      page: 1,
      perPage: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError)
  })
})
