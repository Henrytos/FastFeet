import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface DeliveryAddressProps {
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    zip: string;
    number: string;
    latitude: number;
    longitude: number;
}
export declare class DeliveryAddress extends Entity<DeliveryAddressProps> {
    get state(): string;
    set state(state: string);
    get city(): string;
    set city(city: string);
    get neighborhood(): string;
    set neighborhood(neighborhood: string);
    get street(): string;
    set street(street: string);
    get zip(): string;
    set zip(zip: string);
    get number(): string;
    set number(number: string);
    get latitude(): number;
    set latitude(latitude: number);
    get longitude(): number;
    set longitude(longitude: number);
    static create(props: DeliveryAddressProps, id?: UniqueEntityID): DeliveryAddress;
}
