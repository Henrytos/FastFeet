import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Cpf } from "./value-object/cpf";

export interface DeliveryManProps {
  cpf: Cpf;
  password: string;
  name: string;
  administratorId: UniqueEntityID;
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

  static create(props: DeliveryManProps, id?: UniqueEntityID) {
    const deliveryMan = new DeliveryMan(props, id);

    return deliveryMan;
  }
}
