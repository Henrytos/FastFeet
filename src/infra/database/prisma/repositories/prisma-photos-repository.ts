import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository'
import { PrismaPhotoMapper } from '../mappers/prisma-photo-mapper'
import { Photo } from '@/domain/delivery/enterprise/entities/photo'

@Injectable()
export class PrismaPhotosRepository implements PhotosRepository {
  constructor(private prisma: PrismaService) {}

  async findById(photoId: string): Promise<Photo | null> {
    const photo = await this.prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    })

    if (!photo) {
      return null
    }

    return PrismaPhotoMapper.toDomain(photo)
  }

  async create(photo: Photo): Promise<void> {
    const data = PrismaPhotoMapper.toPrisma(photo)

    await this.prisma.photo.create({
      data,
    })
  }
}
