import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Cpf } from './value-object/cpf';

export interface DeliveryManProps {
  cpf: Cpf;
  password: string;
  name: string;
}

export class DeliveryMan extends Entity<DeliveryManProps> {
  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }

  get name() {
    return this.props.name;
  }

  static create(props: DeliveryManProps, id?: UniqueEntityID) {
    const deliveryMan = new DeliveryMan(props, id);

    return deliveryMan;
  }
}
