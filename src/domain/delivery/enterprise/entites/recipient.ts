import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface RecipientProps {
  name: string;
}

export class Recipient extends Entity<RecipientProps> {
  get name(): string {
    return this.name;
  }

  static create(props: RecipientProps, id?: UnqiueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
