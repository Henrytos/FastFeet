import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

export class FakeHashGenerator implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}
