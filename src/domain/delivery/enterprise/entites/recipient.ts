import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface RecipientProps {
  id: UnqiueEntityID;
  name: string;
}

export class Recipient extends Entity<RecipientProps> {
  get id(): UnqiueEntityID {
    return this.id;
  }

  get name(): string {
    return this.name;
  }

  static create(props: RecipientProps, id?: UnqiueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
