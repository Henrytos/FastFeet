import { Either } from '@/core/either';
import { Uploader } from '../storage/uploader';
import { PhotosRepository } from '../repositories/photos-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
interface UploadPhotoForStorageUseCaseRequest {
    photo: Buffer;
    fileName: string;
    fileType: string;
}
type UploadPhotoForStorageUseCaseResponse = Either<WrongCredentialsError, {
    url: string;
}>;
export declare class UploadPhotoForStorageUseCase {
    private readonly uploader;
    private readonly photosRepository;
    constructor(uploader: Uploader, photosRepository: PhotosRepository);
    execute({ photo, fileName, fileType, }: UploadPhotoForStorageUseCaseRequest): Promise<UploadPhotoForStorageUseCaseResponse>;
    private isInValidFiletypeOfPhoto;
}
export {};
