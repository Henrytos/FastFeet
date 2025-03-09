import { DomainEvent } from '../events/domain-event';
import { Entity } from './entity';
export declare abstract class AggregateRoot<Props> extends Entity<Props> {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addDomainEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
}
