import { UseCaseError } from '@/core/errors/use-case-error';
export declare class NotificationDoesNotExistsError extends Error implements UseCaseError {
    constructor();
}
