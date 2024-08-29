import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface OrderProps {
  id: UnqiueEntityID;
  deliviryManId: UnqiueEntityID;
  deliveryAddressId: UnqiueEntityID;
  reciverId: UnqiueEntityID;
  status: "pending" | "delivered" | "withdrawn";
  createdAt: Date;
  updatedAt?: Date | null;
  deliveryDate?: Date | null;
  withdrawnDate: Date;
}

export class Order extends Entity<OrderProps> {
  get id(): UnqiueEntityID {
    return this.props.id;
  }

  get deliviryManId(): UnqiueEntityID {
    return this.props.deliviryManId;
  }

  get deliveryAddressId(): UnqiueEntityID {
    return this.props.deliveryAddressId;
  }

  get reciverId(): UnqiueEntityID {
    return this.props.reciverId;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deliveryDate() {
    return this.props.deliveryDate;
  }

  get withdrawnDate() {
    return this.props.withdrawnDate;
  }

  static create(props: Optional<OrderProps, "createdAt">, id: UnqiueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return order;
  }
}
