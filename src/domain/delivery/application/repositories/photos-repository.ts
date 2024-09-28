import { Photo } from '../../enterprise/entities/photo';

export interface PhotosRepository {
  create(photo: Photo): Promise<void>;
  existsPhotoByIds(photoIds: string[]): Promise<boolean>;
}
