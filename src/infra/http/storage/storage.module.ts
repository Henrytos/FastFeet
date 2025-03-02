import { Module } from '@nestjs/common'
import { R2Storage } from './uploader.service'
import { EnvModule } from '@/infra/env/env.module'
import { Uploader } from '@/domain/delivery/application/storage/uploader'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: R2Storage }],
  exports: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
})
export class StorageModule {}
