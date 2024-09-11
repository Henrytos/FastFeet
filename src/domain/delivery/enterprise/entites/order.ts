import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface OrderProps {
  deliviryManId?: UniqueEntityID;
  recipientId: UniqueEntityID;
  status: "pending" | "delivered" | "withdrawn" | "canceled";
  createdAt: Date;
  updatedAt?: Date | null;
  deliveryAt?: Date | null;
  withdrawnAt?: Date | null;
  photoIds?: UniqueEntityID[];
}

export class Order extends Entity<OrderProps> {
  get deliviryManId(): UniqueEntityID | undefined {
    return this.props.deliviryManId;
  }

  set deliviryManId(deliviryManId: UniqueEntityID) {
    this.props.deliviryManId = deliviryManId;
    this.touch();
  }

  get recipientId() {
    return this.props.recipientId;
  }
  get photoIds(): UniqueEntityID[] | null | undefined {
    return this.props.photoIds;
  }

  set photoIds(photoIds: UniqueEntityID[]) {
    this.props.photoIds = photoIds;
  }

  get status() {
    return this.props.status;
  }

  set status(status: "pending" | "withdrawn" | "delivered" | "canceled") {
    this.props.status = status;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deliveryAt(): Date | null | undefined {
    return this.props.deliveryAt;
  }

  set deliveryAt(deliveryAt: Date) {
    this.props.deliveryAt = deliveryAt;
    this.touch();
  }

  get withdrawnAt(): Date | undefined | null {
    return this.props.withdrawnAt;
  }

  set withdrawnAt(withdrawnAt: Date) {
    this.props.withdrawnAt = withdrawnAt;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<OrderProps, "createdAt">, id?: UniqueEntityID) {
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
