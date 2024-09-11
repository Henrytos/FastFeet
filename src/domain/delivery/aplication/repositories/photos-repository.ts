import { Photo } from "../../enterprise/photo";

export interface PhotosRepository {
  create(photo: Photo): Promise<void>;
  existsPhotoByIds(photoIds: string[]): Promise<boolean>;
}
