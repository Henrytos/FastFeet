import { DomainEvent } from '@/core/events/domain-event';
import { Order } from '../entities/order';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export declare class OrderCanceledEvent implements DomainEvent {
    ocurredAt: Date;
    order: Order;
    constructor(order: Order);
    getAggregateId(): UniqueEntityID;
}
