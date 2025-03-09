import { Photo } from '@/domain/delivery/enterprise/entities/photo';
export declare abstract class PhotosRepository {
    abstract create(photo: Photo): Promise<void>;
    abstract findById(photoId: string): Promise<Photo | null>;
    abstract exists(id: string): Promise<boolean>;
}
