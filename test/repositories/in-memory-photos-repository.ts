import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'
import { Photo } from '@/domain/delivery/enterprise/entities/photo'

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = []

  async create(photo: Photo): Promise<void> {
    this.items.push(photo)
  }

  async findById(photoId: string): Promise<Photo | null> {
    const photo = this.items.find((photo) => photo.id.toString() === photoId)

    if (!photo) {
      return null
    }

    return photo
  }

  async exists(id: string): Promise<boolean> {
    const photoDoesExists: boolean = this.items.some(
      (item) => item.id.toString() === id,
    )

    return photoDoesExists
  }
}
