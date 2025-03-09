import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Cpf } from './value-object/cpf';
export interface DeliveryManProps {
    cpf: Cpf;
    password: string;
    name: string;
}
export declare class DeliveryMan extends Entity<DeliveryManProps> {
    get cpf(): Cpf;
    get password(): string;
    set password(password: string);
    get name(): string;
    static create(props: DeliveryManProps, id?: UniqueEntityID): DeliveryMan;
}
