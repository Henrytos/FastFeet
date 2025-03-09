import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface RecipientProps {
    name: string;
    email: string;
}
export declare class Recipient extends Entity<RecipientProps> {
    get name(): string;
    set name(name: string);
    get email(): string;
    set email(email: string);
    static create(props: RecipientProps, id?: UniqueEntityID): Recipient;
}
