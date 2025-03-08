import { Module } from '@nestjs/common'
import { EnvModule } from '@/infra/env/env.module'
import { Uploader } from '@/domain/delivery/application/storage/uploader'
import { R2StorageUploader } from './r2-storage-uploader.service'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: R2StorageUploader }],
  exports: [
    {
      provide: Uploader,
      useClass: R2StorageUploader,
    },
  ],
})
export class StorageModule {}
