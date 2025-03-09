import { UniqueEntityID } from './unique-entity-id';
export declare abstract class Entity<Props> {
    private _id;
    protected props: Props;
    protected constructor(props: Props, id?: UniqueEntityID);
    get id(): UniqueEntityID;
    equals(entity: Entity<unknown>): boolean;
}
