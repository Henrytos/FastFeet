import { UnqiueEntityID } from "./unique-entity-id";

export abstract class Entity<Props> {
  private _id: UnqiueEntityID;
  protected props: Props;

  protected constructor(props: Props, id?: UnqiueEntityID) {
    this.props = props;
    this._id = id ?? new UnqiueEntityID();
  }

  get id(): UnqiueEntityID {
    return this._id;
  }
}
