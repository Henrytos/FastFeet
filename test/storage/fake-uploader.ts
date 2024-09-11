import {
  Uploader,
  UploadParams,
} from "@/domain/delivery/aplication/storage/uploader";

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
