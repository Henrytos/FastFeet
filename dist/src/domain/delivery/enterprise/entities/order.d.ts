import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { ORDER_STATUS } from '@/core/constants/order-status.enum';
export interface OrderProps {
    deliveryManId?: UniqueEntityID | null;
    recipientId?: UniqueEntityID | null;
    deliveryAddressId?: UniqueEntityID | null;
    status: ORDER_STATUS;
    createdAt: Date;
    updatedAt?: Date | null;
    deliveryAt?: Date | null;
    withdrawnAt?: Date | null;
    photoId?: UniqueEntityID | null;
}
export declare class Order extends AggregateRoot<OrderProps> {
    get deliveryManId(): UniqueEntityID | null | undefined;
    set deliveryManId(deliveryManId: UniqueEntityID);
    get recipientId(): UniqueEntityID | null | undefined;
    get photoId(): UniqueEntityID | null | undefined;
    set photoId(photoId: UniqueEntityID);
    get deliveryAddressId(): UniqueEntityID | null | undefined;
    set deliveryAddressId(deliveryAddressId: UniqueEntityID);
    get status(): ORDER_STATUS;
    set status(status: ORDER_STATUS);
    get createdAt(): Date;
    get updatedAt(): Date;
    get deliveryAt(): Date | null | undefined;
    private set deliveryAt(value);
    get withdrawnAt(): Date | undefined | null;
    private set withdrawnAt(value);
    private touch;
    isValidForCanceled(): boolean;
    isValidForWithdrawn(): boolean;
    isValidForDelivered(): boolean;
    static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID): Order;
}
