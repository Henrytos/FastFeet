import { UseCaseError } from '@/core/errors/use-case-error';
export declare class DeliveryAddressDoesNotExistError extends Error implements UseCaseError {
    constructor();
}
