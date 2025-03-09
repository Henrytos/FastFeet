import { UseCaseError } from '@/core/errors/use-case-error';
export declare class OrderDoesNotExistError extends Error implements UseCaseError {
    constructor();
}
