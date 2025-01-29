import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'
import { makeRecipient } from '@/test/factories/make-recipient'

import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'
import { DeliveryAddressDoesNotExistError } from './errors/delivery-address-does-not-exist-error'

import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'

import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { SendingOrderToRecipientByDeliveryManUseCase } from './sending-order-to-recipient-by-delivery-person-use-case'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { makeOrder } from '@/test/factories/make-order'
import { OrderDoesNotExistError } from './errors/order-does-not-exist-error'
import { DeliveryManDoesNotExistError } from './errors/delivery-man-does-not-exist-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'

describe('register order for recipient use case', () => {
  let sut: SendingOrderToRecipientByDeliveryManUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )
    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    sut = new SendingOrderToRecipientByDeliveryManUseCase(
      inMemoryOrdersRepository,
      inMemoryDeliveryMansRepository,
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )
  })

  it('should be send order to recipient through the delivery', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const order = makeOrder({
      recipientId: recipient.id,
      deliveryAddressId: deliveryAddress.id,
    })

    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: 'withdrawn',
      },
    })
  })

  it('should not be possible to send order if there is no order', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const result = await sut.execute({
      orderId: 'invalid-order-id',
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(0)
    expect(result.value).toBeInstanceOf(OrderDoesNotExistError)
  })

  it('should not be possible to send order if there is no delivery man', async () => {
    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const order = makeOrder({
      recipientId: recipient.id,
    })

    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: 'invalid-delivery-man-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(DeliveryManDoesNotExistError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: ORDER_STATUS.PENDING,
      },
    })
  })

  it('should not be possible to send order if there is no recipient', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const order = makeOrder({
      recipientId: new UniqueEntityID('invalid-recipient-id'),
    })
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(RecipientDoesNotExistError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: ORDER_STATUS.PENDING,
      },
    })
  })

  it('should not be possible to send order if there is no destination', async () => {
    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const order = makeOrder({
      recipientId: recipient.id,
      deliveryAddressId: new UniqueEntityID('invalid-delivery-address-id'),
    })

    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(DeliveryAddressDoesNotExistError)
    expect(inMemoryOrdersRepository.items[0]).toMatchObject({
      props: {
        status: ORDER_STATUS.PENDING,
      },
    })
  })
})
