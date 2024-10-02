import { Photo } from '@/domain/delivery/enterprise/entities/photo';
import { Prisma, Photo as PrismaPhoto } from '@prisma/client';

export class PrismaPhotoMapper {
  static toDomain(raw: PrismaPhoto): Photo {
    return Photo.create({
      fileName: raw.filename,
      url: raw.url,
    });
  }

  static toPrisma(photo: Photo): Prisma.PhotoUncheckedCreateInput {
    return {
      filename: photo.fileName,
      url: photo.url,
    };
  }
}
