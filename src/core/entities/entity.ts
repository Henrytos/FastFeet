import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  get id(): UniqueEntityID {
    return this._id
  }

  equals(entity: Entity<unknown>) {
    if (entity.id === this._id) {
      return true
    }

    if (entity === this) {
      return true
    }

    return false
  }
}
