export abstract class HashComparer {
  abstract comparer(value: string, hash: string): Promise<boolean>
}
