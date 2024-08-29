import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface AdministratorProsp {
  id: UnqiueEntityID;
  cpf: string;
  password: string;
  name: string;
}

export class Administrator extends Entity<AdministratorProsp> {
  get id(): UnqiueEntityID {
    return this.id;
  }

  get cpf(): string {
    return this.cpf;
  }

  get password(): string {
    return this.password;
  }

  get name(): string {
    return this.name;
  }

  static create(props: Administrator, id?: UnqiueEntityID) {
    const administrator = new Administrator(props, id);

    return administrator;
  }
}
