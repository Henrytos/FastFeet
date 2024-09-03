import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface OrderProps {
  deliviryManId?: UnqiueEntityID;
  recipientId: UnqiueEntityID;
  status: "pending" | "delivered" | "withdrawn";
  createdAt: Date;
  updatedAt?: Date | null;
  deliveryAt?: Date | null;
  withdrawnAt?: Date;
  photoIds?: UnqiueEntityID[];
}

export class Order extends Entity<OrderProps> {
  get deliviryManId() {
    return this.props.deliviryManId;
  }

  get recipientId() {
    return this.props.recipientId;
  }
  get photoIds() {
    return this.props.photoIds;
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

  get deliveryAt() {
    return this.props.deliveryAt;
  }

  get withdrawnAt() {
    return this.props.withdrawnAt;
  }

  static create(props: Optional<OrderProps, "createdAt">, id?: UnqiueEntityID) {
    const order = new Order(
      {
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? new Date(),

        ...props,
      },
      id
    );

    return order;
  }
}
