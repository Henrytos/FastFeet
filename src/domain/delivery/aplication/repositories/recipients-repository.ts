import { Recipient } from "../../enterprise/entites/recipient";

export interface RecipientsRepository {
  findById(id: string): Promise<Recipient | null>;
  create(recipient: Recipient): Promise<void>;
  findByEmail(email: string): Promise<Recipient | null>;
  delete(recipient: Recipient): Promise<void>;
  save(recipient: Recipient): Promise<void>;
}
