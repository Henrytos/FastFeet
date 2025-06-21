import { Either } from '@/core/either';
import { AdministratorsRepository } from '../repositories/administrators-repository';
import { AdministratorDoesNotExistError } from './errors/administrator-does-not-exist-error';
import { MetricsOfWeek } from '@/domain/delivery/enterprise/entities/value-object/metrics-of-week';
import { OrdersRepository } from '../repositories/orders-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
interface GetMetricsOfWeekUseCaseRequest {
    administratorId: string;
    pastTargetWeek: number;
}
type GetMetricsOfWeekUseCaseResponse = Either<AdministratorDoesNotExistError | WrongCredentialsError, {
    metrics: MetricsOfWeek;
}>;
export declare class GetMetricsOfWeekUseCase {
    private administratorsRepository;
    private ordersRepository;
    constructor(administratorsRepository: AdministratorsRepository, ordersRepository: OrdersRepository);
    execute({ administratorId, pastTargetWeek, }: GetMetricsOfWeekUseCaseRequest): Promise<GetMetricsOfWeekUseCaseResponse>;
}
export {};
