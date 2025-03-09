import { PrismaService } from '../prisma.service';
import { PhotosRepository } from '@/domain/delivery/application/repositories/photos-repository';
import { Photo } from '@/domain/delivery/enterprise/entities/photo';
export declare class PrismaPhotosRepository implements PhotosRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(photoId: string): Promise<Photo | null>;
    create(photo: Photo): Promise<void>;
    exists(id: string): Promise<boolean>;
}
