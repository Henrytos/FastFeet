import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
export interface PhotoProps {
    url: string;
    fileName: string;
}
export declare class Photo extends Entity<PhotoProps> {
    get url(): string;
    set url(url: string);
    get fileName(): string;
    set fileName(fileName: string);
    static create(props: PhotoProps, id?: UniqueEntityID): Photo;
}
