import { InMemoryAdministratorsRepository } from '@/test/repositories/in-memory-administrators-repository'
import { GetMetricsOfWeekUseCase } from './get-metrics-of-week-use-case'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemoryDeliveryAddressRepository } from '@/test/repositories/in-memory-delivery-address-repository'
import { InMemoryRecipientsRepository } from '@/test/repositories/in-memory-recipients-repository'
import { makeAdministrator } from '@/test/factories/make-administrator'

describe('get metrics of week use case', () => {
  let sut: GetMetricsOfWeekUseCase
  let inMemoryDeliveryAddressRepository: InMemoryDeliveryAddressRepository
  let inMemoryRecipientsRepository: InMemoryRecipientsRepository
  let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
  let inMemoryOrdersRepository: InMemoryOrdersRepository

  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()

    inMemoryDeliveryAddressRepository = new InMemoryDeliveryAddressRepository()
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository(
      inMemoryOrdersRepository,
      inMemoryDeliveryAddressRepository,
    )
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryDeliveryAddressRepository,
      inMemoryRecipientsRepository,
    )

    sut = new GetMetricsOfWeekUseCase(
      inMemoryAdministratorsRepository,
      inMemoryOrdersRepository,
    )
  })

  it('should be possible to get this weeks metrics', async () => {
    const administrator = makeAdministrator()

    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      administratorId: administrator.id.toValue(),
      pastTargetWeek: 0,
    })

    console.log(result.value)

    expect(result).not.toBeNull()
  })
})
