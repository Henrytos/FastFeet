import { UseCaseError } from '@/core/errors/use-case-error';
export declare class AdministratorDoesNotExistError extends Error implements UseCaseError {
    constructor();
}
