import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { GetOrderByIdUseCase } from './get-order-by-id-use-case'
import { makeOrder } from '@/test/factories/make-order'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { makeRecipient } from '@/test/factories/make-recipient'
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'

describe('get order by id use case', () => {
  let sut: GetOrderByIdUseCase
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository

  let inMemoryRecipientsRepository: InMemoryRecipientsRepository

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()

    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )

    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )

    sut = new GetOrderByIdUseCase(inMemoryOrdersRepository)
  })

  it('should return an order by the id', async () => {
    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const order = makeOrder({
      recipientId: recipient.id,
      deliveryAddressId: deliveryAddress.id,
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toMatchObject({
      orderWithDetails: expect.objectContaining({
        props: expect.objectContaining({
          order: expect.any(Object),
          address: expect.any(Object),
          recipient: expect.any(Object),
        }),
      }),
    })
  })

  it('should not return an order if it does not exist', async () => {
    const result = await sut.execute({
      orderId: 'invalid-order-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError)
  })
})
