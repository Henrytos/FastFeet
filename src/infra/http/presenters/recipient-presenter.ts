import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      name: recipient.name,
      email: recipient.email,
    }
  }
}
