import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

export interface RecipientProps {
  name: string;
  email: string;
  deliveryAddressId: UnqiueEntityID;
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

  static create(props: RecipientProps, id?: UnqiueEntityID) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
