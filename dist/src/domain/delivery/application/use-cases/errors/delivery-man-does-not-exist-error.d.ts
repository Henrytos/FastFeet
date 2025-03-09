import { UseCaseError } from '@/core/errors/use-case-error';
export declare class DeliveryManDoesNotExistError extends Error implements UseCaseError {
    constructor();
}
