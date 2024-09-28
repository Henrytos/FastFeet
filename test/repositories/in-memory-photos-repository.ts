import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository';
import { Photo } from '@/domain/delivery/enterprise/entities/photo';

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = [];

  async create(photo: Photo): Promise<void> {
    this.items.push(photo);
  }

  async existsPhotoByIds(photoIds: string[]): Promise<boolean> {
    const photoMatchIds = this.items.map((item) => {
      return photoIds.includes(item.id.toValue());
    });

    return photoMatchIds.length === photoIds.length;
  }
}
