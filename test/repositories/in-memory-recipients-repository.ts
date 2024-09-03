import { RecipientsRepository } from "@/domain/delivery/aplication/repositories/recipients-repositorys";
import { Recipient } from "@/domain/delivery/enterprise/entites/recipient";

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = [];

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find(
      (recipient) => recipient.id.toString() === id
    );

    if (!recipient) {
      return null;
    }

    return recipient;
  }
}
