import { UseCaseError } from '@/core/errors/use-case-error';
export declare class RecipientDoesNotExistError extends Error implements UseCaseError {
    constructor();
}
