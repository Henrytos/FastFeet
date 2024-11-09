import { UseCaseError } from '@/core/errors/use-case-error'

export class NotificationDoesNotExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Notification does not exists')
    this.name = 'NotificationDoesNotExistsError'
  }
}
