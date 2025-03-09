import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

@Injectable()
export class HashGeneratorService implements HashGenerator {
  private salt: number = 8

  async hash(plain: string): Promise<string> {
    const plainHash = await hash(plain, this.salt)
    return plainHash
  }
}
