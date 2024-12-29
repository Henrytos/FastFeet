import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export abstract class RecipientsRepository {
  abstract findById(id: string): Promise<Recipient | null>
  abstract create(recipient: Recipient): Promise<void>
  abstract findByEmail(email: string): Promise<Recipient | null>
  abstract delete(recipient: Recipient): Promise<void>
  abstract save(recipient: Recipient): Promise<void>
  abstract fetchRecipients(page: number, perPage: number): Promise<Recipient[]>
}
