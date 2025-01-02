import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { FetchRecentOrderUseCase } from './fetch-recent-order-use-case'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { makeAdministrator } from '@/test/factories/make-administrator'
import { makeOrder } from '@/test/factories/make-order'
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
import { GetPreviousDateByTime } from '@/test/utils/get-previous-date-by-time'

describe('fetch order use case (unit)', async () => {
  let sut: FetchRecentOrderUseCase
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
    )

    sut = new FetchRecentOrderUseCase(
      inMemoryAdministratorsRepository,
      inMemoryOrdersRepository,
    )
  })

  it('deveria ser possivel listar pedidos', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    for (let i = 0; i < 21; i++) {
      inMemoryOrdersRepository.items.push(
        makeOrder({ recipientId: administrator.id }),
      )
    }

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      page: 1,
      perPage: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('orders')
    expect(result.value).toMatchObject({
      orders: expect.any(Array),
    })
    expect(result.value).toMatchObject({
      orders: expect.arrayContaining([
        expect.objectContaining({
          recipientId: administrator.id,
        }),
      ]),
    })

    if (result.isRight()) {
      expect(result.value.orders).toHaveLength(10)
    }
  })

  it('deveria ser possivel listar pedidos do mais antigo ao mais recente', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    const getPreviousDateByTime = new GetPreviousDateByTime()

    for (let i = 0; i < 20; i++) {
      inMemoryOrdersRepository.items.push(
        makeOrder({
          recipientId: administrator.id,
          createdAt: getPreviousDateByTime.differenceInDays(i),
        }),
      )
    }

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      page: 1,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('orders')
    expect(result.value).toMatchObject({
      orders: expect.any(Array),
    })
    expect(result.value).toMatchObject({
      orders: expect.arrayContaining([
        expect.objectContaining({
          recipientId: administrator.id,
        }),
      ]),
    })

    if (result.isRight()) {
      expect(result.value.orders).toHaveLength(20)
      const diff =
        Number(result.value.orders[0].createdAt) -
        Number(result.value.orders[1].createdAt)

      expect(diff).toBeTruthy()
    }
  })

  it('deveria ser possivel listar pedidos da pagina 2', async () => {
    const administrator = makeAdministrator()
    inMemoryAdministratorsRepository.items.push(administrator)

    for (let i = 0; i < 21; i++) {
      inMemoryOrdersRepository.items.push(
        makeOrder({ recipientId: administrator.id }),
      )
    }

    const result = await sut.execute({
      administratorId: administrator.id.toString(),
      page: 3,
      perPage: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('orders')
    expect(result.value).toMatchObject({
      orders: expect.any(Array),
    })
    expect(result.value).toMatchObject({
      orders: expect.arrayContaining([
        expect.objectContaining({
          recipientId: administrator.id,
        }),
      ]),
    })

    if (result.isRight()) {
      expect(result.value.orders).toHaveLength(1)
    }
  })

  it('deveria retornar erro se administrador não existir', async () => {
    const result = await sut.execute({
      administratorId: 'invalid-administrator-id',
      page: 1,
      perPage: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdministratorDoesNotExistError)
  })
})
