import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface DeliveryManProps {
  id: UnqiueEntityID;
  cpf: string;
  password: string;
  name: string;
}

export class DeliveryMan extends Entity<DeliveryManProps> {
  get id(): UnqiueEntityID {
    return this.id;
  }

  get cpf(): UnqiueEntityID {
    return this.cpf;
  }

  get password(): UnqiueEntityID {
    return this.password;
  }

  get name(): string {
    return this.name;
  }

  static create(props: DeliveryMan, id?: UnqiueEntityID) {
    const deliveryMan = new DeliveryMan(props, id);

    return deliveryMan;
  }
}
