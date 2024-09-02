import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

export interface AdministratorProps {
  id: UnqiueEntityID;
  cpf: string;
  password: string;
  name: string;
}

export class Administrator extends Entity<AdministratorProps> {
  get id(): UnqiueEntityID {
    return this.props.id;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  static create(props: AdministratorProps, id?: UnqiueEntityID) {
    const administrator = new Administrator(props, id);

    return administrator;
  }
}
