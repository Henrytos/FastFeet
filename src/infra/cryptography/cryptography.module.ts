import { Module } from '@nestjs/common'
import { HashComparerService } from './hash-comparer.service'
import { HashGeneratorService } from './hash-generator.service'
import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'
import { Encrypter } from '@/domain/delivery/application/cryptography/encrypter'
import { JwtEncrypterService } from './jwt-encrypter.service'

@Module({
  providers: [
    {
      provide: HashComparer,
      useClass: HashComparerService,
    },
    {
      provide: HashGenerator,
      useClass: HashGeneratorService,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypterService,
    },
  ],
  exports: [HashComparer, HashGenerator, Encrypter],
})
export class CryptographyModule {}
