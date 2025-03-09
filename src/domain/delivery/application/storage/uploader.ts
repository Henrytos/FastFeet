export interface UploadParams {
  fileName: string
  fileType: string
  body: Buffer
}

export abstract class Uploader {
  upload: ({
    fileName,
    fileType,
    body,
  }: UploadParams) => Promise<{ url: string }>
}
