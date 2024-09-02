import { HashGenerator } from "@/domain/delivery/aplication/cryptography/hash-generator";

export class FakeHashGenerator implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat("-hashed");
  }
}
