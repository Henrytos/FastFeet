import { Recipient } from "../../enterprise/entites/recipient";

export interface RecipientsRepository {
  findById(id: string): Promise<Recipient | null>;
  create(recipient: Recipient): Promise<void>;
}
