import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
export interface NotificationProps {
    recipientId: UniqueEntityID;
    title: string;
    content: string;
    createdAt: Date;
    readAt?: Date;
}
export declare class Notification extends Entity<NotificationProps> {
    get title(): string;
    get content(): string;
    get recipientId(): UniqueEntityID;
    get createdAt(): Date;
    get readAt(): Date;
    read(): void;
    static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID): Notification;
}
