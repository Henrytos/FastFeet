import { Photo } from '@/domain/delivery/enterprise/entities/photo';

export abstract class PhotosRepository {
  abstract create(photo: Photo): Promise<void>;
  abstract existsPhotoById(photoId: string): Promise<boolean>;
}
