import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { Order } from '../entities/order';
export declare class OrderMakeDeliveredEvent implements DomainEvent {
    ocurredAt: Date;
    order: Order;
    constructor(order: Order);
    getAggregateId(): UniqueEntityID;
}
