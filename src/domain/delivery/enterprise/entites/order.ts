import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface OrderProps {
  id: UnqiueEntityID;
  deliviryManId: UnqiueEntityID;
  deliveryAddressId: UnqiueEntityID;
  reciverId: UnqiueEntityID;
  status: "pending" | "delivered" | "withdrawn";
  createdAt: Date;
  updatedAt?: Date;
  deliveryDate?: Date;
  withdrawnDate: Date;
}

export class Order extends Entity<OrderProps> {}
