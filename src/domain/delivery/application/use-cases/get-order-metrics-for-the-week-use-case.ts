// import { Either, left, right } from '@/core/either'
// import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error'
// import { OrdersRepository } from '../repositories/orders-repository'
// import { AdministratorsRepository } from '../repositories/administrators-repository'

// interface MetricsOrder {
//   total: number
//   totalDelivered: number
//   totalPending: number
//   totalCanceled: number
//   totalRetired: number
// }

// interface GetOrderMetricsForTheWeekUseCaseRequest {
//   administratorId: string
// }

// type GetOrderMetricsForTheWeekUseCaseResponse = Either<
//   AdministratorDoesNotExistError,
//   MetricsOrder
// >

// export class GetOrderMetricsForTheWeekUseCase {
//   constructor(
//     private readonly administratorsRepository: AdministratorsRepository,
//     private readonly ordersRepository: OrdersRepository,
//   ) {}

//   async execute({
//     administratorId,
//   }: GetOrderMetricsForTheWeekUseCaseRequest): Promise<GetOrderMetricsForTheWeekUseCaseResponse> {
//     const administrator =
//       await this.administratorsRepository.findById(administratorId)

//     if (!administrator) {
//       return left(new AdministratorDoesNotExistError())
//     }

//     const ordersCanceled = await this.ordersRepository.countCanceledOrders()
//     const ordersDelivered = await this.ordersRepository.countDeliveredOrders()
//     const ordersPending = await this.ordersRepository.countPendingOrders()
//     const ordersRetired = await this.ordersRepository.countRetiredOrders()

//     return right({
//       total: ordersCanceled + ordersDelivered + ordersPending + ordersRetired,
//       totalCanceled: ordersCanceled,
//       totalDelivered: ordersDelivered,
//       totalPending: ordersPending,
//       totalRetired: ordersRetired,
//     })
//   }
// }
