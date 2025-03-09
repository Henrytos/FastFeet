import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Cpf } from './value-object/cpf';
export interface AdministratorProps {
    cpf: Cpf;
    password: string;
    name: string;
}
export declare class Administrator extends Entity<AdministratorProps> {
    get cpf(): Cpf;
    get password(): string;
    get name(): string;
    static create(props: AdministratorProps, id?: UniqueEntityID): Administrator;
}
