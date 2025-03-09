import { UploadPhotoForStorageUseCase } from '@/domain/delivery/application/use-cases/upload-and-create-photo-use-case';
export declare class UploadPhotoForStorageController {
    private readonly uploadPhotoForStorageUseCase;
    constructor(uploadPhotoForStorageUseCase: UploadPhotoForStorageUseCase);
    handler(file: Express.Multer.File): Promise<{
        photoUrl: string;
    }>;
}
