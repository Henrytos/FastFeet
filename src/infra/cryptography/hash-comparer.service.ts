import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class HashComparerService implements HashComparer {
  async comparer(value: string, hash: string): Promise<boolean> {
    const isEqual = await compare(value, hash);

    return isEqual;
  }
}
