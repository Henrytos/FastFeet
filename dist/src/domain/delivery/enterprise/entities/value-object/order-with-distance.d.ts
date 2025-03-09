import { ValueObject } from '@/core/entities/value-object';
import { Order } from '../order';
interface OrderWithDistanceProps {
    distanceInKms: number;
    order: Order;
}
export declare class OrderWithDistance extends ValueObject<OrderWithDistanceProps> {
    static create(vo: OrderWithDistanceProps): OrderWithDistance;
    get distanceInKms(): number;
    get order(): Order;
}
export {};
