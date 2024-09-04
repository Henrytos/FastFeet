import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface RecipientProps {
  name: string;
  email: string;
  deliveryAddressId: UniqueEntityID;
}

export class Recipient extends Entity<RecipientProps> {
  get name(): string {
    return this.name;
  }

  get email(): string {
    return this.props.email;
  }

  get deliveryAddressId() {
    return this.props.deliveryAddressId;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
