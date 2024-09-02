import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface DeliveryManProps {
  cpf: string;
  password: string;
  name: string;
  administratorId: UnqiueEntityID;
}

export class DeliveryMan extends Entity<DeliveryManProps> {
  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  get administratorId() {
    return this.props.administratorId;
  }

  static create(props: DeliveryManProps, id?: UnqiueEntityID) {
    const deliveryMan = new DeliveryMan(props, id);

    return deliveryMan;
  }
}
