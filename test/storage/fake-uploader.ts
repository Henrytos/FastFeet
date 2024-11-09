import {
  Uploader,
  UploadParams,
} from '@/domain/delivery/application/storage/uploader'

export class FakeUploader implements Uploader {
  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    return {
      url: fileName,
    }
  }
}
