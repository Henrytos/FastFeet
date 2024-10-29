import { Photo } from "@/domain/delivery/enterprise/entities/photo";

export abstract class PhotosRepository {
  abstract create(photo: Photo): Promise<void>;
  abstract findById(photoId: string): Promise<Photo | null>;
}
