import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor(typeCredential?: string) {
    super('Wrong credentials'.concat('[', typeCredential, ']'))
  }
}
