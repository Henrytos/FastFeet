import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { UpdateOrderUseCase } from './update-order-use-case'
import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { makeOrder } from '@/test/factories/make-order'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { InMemoryDeliveryMansRepository } from '@/test/repositories/in-memory-delivery-mans-repository'
import { makeDeliveryAddress } from '@/test/factories/make-delivery-address'
import { makeDeliveryMan } from '@/test/factories/make-delivery-man'
import { ORDER_STATUS } from '@/core/constants/order-status.enum'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { InMemoryPhotosRepository } from '@/test/repositories/in-memory-photos-repository'
import { makePhoto } from '@/test/factories/make-photo'
import { makeRecipient } from '@/test/factories/make-recipient'
describe('update order use case', () => {
  let sut: UpdateOrderUseCase
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let inMemoryDeliveryMansRepository: InMemoryDeliveryMansRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository
  let inMemoryPhotosRepository: InMemoryPhotosRepository

  beforeEach(() => {
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()

    inMemoryDeliveryMansRepository = new InMemoryDeliveryMansRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    inMemoryPhotosRepository = new InMemoryPhotosRepository()

    sut = new UpdateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryAdministratorsRepository,
      inMemoryDeliveryMansRepository,
    )
  })

  it('should be possible to update order', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const deliveryAddress = makeDeliveryAddress()
    inMemoryDeliveryAddressRepository.items.push(deliveryAddress)

    const deliveryMan = makeDeliveryMan()
    inMemoryDeliveryMansRepository.items.push(deliveryMan)

    const photo = makePhoto()
    inMemoryPhotosRepository.items.push(photo)

    const recipient = makeRecipient()
    inMemoryRecipientsRepository.items.push(recipient)

    const order = makeOrder()
    inMemoryOrdersRepository.items.push(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      administratorId: administrator.id.toString(),
      deliveryManId: deliveryMan.id.toString(),
      status: ORDER_STATUS.DELIVERED,
      withdrawnAt: new Date(),
      deliveryAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)

    const updatedOrder = inMemoryOrdersRepository.items[0]

    expect(updatedOrder).toMatchObject(
      expect.objectContaining({
        deliveryManId: deliveryMan.id,
        status: ORDER_STATUS.DELIVERED,
        withdrawnAt: expect.any(Date),
        deliveryAt: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    )
  })

  it('should be possible to update order', async () => {
    const result = await sut.execute({
      orderId: 'invalid-order-id',
      administratorId: 'invalid-administrator-id',
      deliveryManId: 'invalid-delivery-man-id',
      status: ORDER_STATUS.DELIVERED,
      withdrawnAt: new Date(),
      deliveryAt: new Date(),
    })

    expect(result.isLeft()).toBe(true)
  })
})
