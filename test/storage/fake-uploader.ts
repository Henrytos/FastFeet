import {
  Uploader,
  UploadParams,
} from "@/domain/delivery/application/storage/uploader";

export class FakeUploader implements Uploader {
  async upload({
    fileName,
    fileType,
    body,
  }: UploadParams): Promise<{ url: string }> {
    return {
      url: fileName,
    };
  }
}
