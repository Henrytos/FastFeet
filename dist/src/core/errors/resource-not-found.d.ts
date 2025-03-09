import { UseCaseError } from '@/core/errors/use-case-error';
export declare class ResourceNotFoundError extends Error implements UseCaseError {
    constructor();
}
