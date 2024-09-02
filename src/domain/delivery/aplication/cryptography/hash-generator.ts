export interface HashGenerator {
  hash(plain: string): Promise<string>;
}
