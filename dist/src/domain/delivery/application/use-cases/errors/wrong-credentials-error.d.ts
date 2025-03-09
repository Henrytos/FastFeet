import { UseCaseError } from '@/core/errors/use-case-error';
export declare class WrongCredentialsError extends Error implements UseCaseError {
    constructor(typeCredential?: string);
}
