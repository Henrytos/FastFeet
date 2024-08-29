import { UnqiueEntityID } from "./unique-entity-id";

export class Entity<Props> {
  protected props: Props;
  private _id: UnqiueEntityID;

  protected constructor(entity: Entity<Props>, id?: UnqiueEntityID) {
    Object.assign(this, entity);

    this._id = id ?? new UnqiueEntityID();
  }

  get id(): UnqiueEntityID {
    return this._id;
  }
}
