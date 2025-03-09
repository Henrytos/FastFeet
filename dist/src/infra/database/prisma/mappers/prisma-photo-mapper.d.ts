import { Photo } from '@/domain/delivery/enterprise/entities/photo';
import { Prisma, Photo as PrismaPhoto } from '@prisma/client';
export declare class PrismaPhotoMapper {
    static toDomain(raw: PrismaPhoto): Photo;
    static toPrisma(photo: Photo): Prisma.PhotoUncheckedCreateInput;
}
