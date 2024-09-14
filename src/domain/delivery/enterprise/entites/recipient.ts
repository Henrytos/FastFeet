import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface RecipientProps {
  name: string;
  email: string;
}

export class Recipient extends Entity<RecipientProps> {
  get name(): string {
    return this.name;
  }

  get email(): string {
    return this.props.email;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
