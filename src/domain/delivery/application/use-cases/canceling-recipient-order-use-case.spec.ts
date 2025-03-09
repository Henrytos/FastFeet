import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { CancelingRecipientOrderUseCase } from './canceling-recipient-order-use-case'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { makeOrder } from '@/test/factories/make-order'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'

describe('cancelling recipient order  use case', () => {
  let sut: CancelingRecipientOrderUseCase
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository

  beforeEach(() => {
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )
    sut = new CancelingRecipientOrderUseCase(
      inMemoryDeliveryMansRepository,
      inMemoryOrdersRepository,
    )
  })

  it('should be possible to cancel an order', async () => {
    const administrator = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(administrator)

    const order = makeOrder({
      status: ORDER_STATUS.PENDING,
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      deliveryManId: administrator.id.toString(),
      orderId: order.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'canceled',
      },
    })
  })

  it('should not be possible to cancel an order if there is no assistant', async () => {
    const order = makeOrder({
      status: ORDER_STATUS.PENDING,
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      deliveryManId: 'invalid-administrator-id',
      orderId: order.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: ORDER_STATUS.PENDING,
      },
    })
  })

  it('should not be possible to cancel an order if there is no order', async () => {
    const administrator = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(administrator)
    const order = makeOrder({
      status: ORDER_STATUS.PENDING,
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      deliveryManId: administrator.id.toString(),
      orderId: 'invalid-order-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: ORDER_STATUS.PENDING,
      },
    })
  })

  it('should not be possible to cancel an order if there is no order', async () => {
    const administrator = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(administrator)
    const order = makeOrder({
      status: ORDER_STATUS.CANCELED,
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      deliveryManId: administrator.id.toString(),
      orderId: order.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'canceled',
        updatedAt: order.updatedAt,
      },
    })
  })
})
