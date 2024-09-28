import { Module } from '@nestjs/common';
import { HashComparerService } from './hash-comparer.service';
import { HashGeneratorService } from './hash-generator.service';
import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator';

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
  ],
  exports: [HashComparer, HashGenerator],
})
export class CryptographyModule {}
