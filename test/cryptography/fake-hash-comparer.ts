import { HashComparer } from "@/domain/delivery/application/cryptography/hash-comparer";

export class FakeHashComparer implements HashComparer {
  async comparer(value: string, hash: string): Promise<boolean> {
    if (value === hash.slice(0, value.length)) {
      return true;
    }
    return false;
  }
}
