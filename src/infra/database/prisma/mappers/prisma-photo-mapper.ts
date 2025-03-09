import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Photo } from '@/domain/delivery/enterprise/entities/photo'
import { Prisma, Photo as PrismaPhoto } from '@prisma/client'

export class PrismaPhotoMapper {
  static toDomain(raw: PrismaPhoto): Photo {
    return Photo.create(
      {
        fileName: raw.filename,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(photo: Photo): Prisma.PhotoUncheckedCreateInput {
    return {
      id: photo.id.toString(),
      filename: photo.fileName,
      url: photo.url,
    }
  }
}
