import {
  Uploader,
  UploadParams,
} from '@/domain/delivery/application/storage/uploader'
import { EnvService } from '@/infra/env/env.service'
import { S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(private readonly envService: EnvService) {
    const accountId = (this.client = new S3Client({ region: 'us-east-1' }))
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploadParams): Promise<{ url: string }> {
    return { url: 'https://example.com/' + fileName }
  }
}
