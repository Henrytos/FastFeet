import { Uploader, UploadParams } from '@/domain/delivery/application/storage/uploader';
import { EnvService } from '@/infra/env/env.service';
export declare class R2StorageUploader implements Uploader {
    private readonly envService;
    private client;
    constructor(envService: EnvService);
    upload({ fileName, fileType, body, }: UploadParams): Promise<{
        url: string;
    }>;
}
