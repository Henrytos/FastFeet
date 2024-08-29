import { Entity } from "@/core/entities/entity";
import { UnqiueEntityID } from "@/core/entities/unique-entity-id";

interface AddresseerProsp {
  id: UnqiueEntityID;
  name: string;
  addresId: UnqiueEntityID;
}

export class Addresseer extends Entity<AddresseerProsp> {
  get id(): UnqiueEntityID {
    return this.id;
  }

  get name(): string {
    return this.name;
  }

  static create(props: Addresseer, id?: UnqiueEntityID) {
    const addresseer = new Addresseer(props, id);

    return addresseer;
  }
}
