import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository';
import { Photo } from '@/domain/delivery/enterprise/entities/photo';

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = [];

  async create(photo: Photo): Promise<void> {
    this.items.push(photo);
  }

  async existsPhotoById(photoId: string): Promise<boolean> {
    return this.items.some((photo) => photo.id.toString() === photoId);
  }
}
