import { UseCaseError } from '@/core/errors/use-case-error';
export declare class PhotoDoesNotExistError extends Error implements UseCaseError {
    message: string;
    constructor();
}
