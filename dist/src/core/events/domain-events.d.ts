import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityID } from '../entities/unique-entity-id';
type DomainEventCallback = (event: unknown) => void;
export declare class DomainEvents {
    private static handlersMap;
    private static markedAggregates;
    static markAggregateForDispatch(aggregate: AggregateRoot<unknown>): void;
    private static dispatchAggregateEvents;
    private static removeAggregateFromMarkedDispatchList;
    private static findMarkedAggregateByID;
    static dispatchEventsForAggregate(id: UniqueEntityID): void;
    static register(callback: DomainEventCallback, eventClassName: string): void;
    static clearHandlers(): void;
    static clearMarkedAggregates(): void;
    private static dispatch;
}
export {};
