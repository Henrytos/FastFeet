import { Photo } from '@/domain/delivery/enterprise/entities/photo';

export interface PhotosRepository {
  create(photo: Photo): Promise<void>;
  existsPhotoById(photoId: string): Promise<boolean>;
}
