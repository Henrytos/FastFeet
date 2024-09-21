import { Photo } from "../../enterprise/entites/photo";

export interface PhotosRepository {
  create(photo: Photo): Promise<void>;
  existsPhotoByIds(photoIds: string[]): Promise<boolean>;
}
