export interface UploadParams {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export interface Uploader {
  upload: ({
    fileName,
    fileType,
    body,
  }: UploadParams) => Promise<{ url: string }>;
}
