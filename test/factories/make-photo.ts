import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Photo, PhotoProps } from '@/domain/delivery/enterprise/entities/photo';
import { PrismaPhotoMapper } from '@/infra/database/prisma/mappers/prisma-photo-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function makePhoto(
  overwide: Partial<PhotoProps> = {},
  id?: UniqueEntityID,
): Photo {
  const photo = Photo.create(
    {
      fileName: faker.lorem.text(),
      url: faker.internet.url(),
      ...overwide,
    },
    id,
  );

  return photo;
}

@Injectable()
export class PhotoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPhoto(override: Partial<PhotoProps> = {}) {
    const photo = makePhoto(override);

    const prismaPhoto = await this.prisma.photo.create({
      data: PrismaPhotoMapper.toPrisma(photo),
    });

    return prismaPhoto;
  }
}
