import { UseCaseError } from '@/core/errors/use-case-error';

export class PhotoDoesNotExistError extends Error implements UseCaseError {
  message = 'Photo does not exist';
  constructor() {
    super();
  }
}
