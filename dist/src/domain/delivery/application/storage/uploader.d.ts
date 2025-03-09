export interface UploadParams {
    fileName: string;
    fileType: string;
    body: Buffer;
}
export declare abstract class Uploader {
    upload: ({ fileName, fileType, body, }: UploadParams) => Promise<{
        url: string;
    }>;
}
