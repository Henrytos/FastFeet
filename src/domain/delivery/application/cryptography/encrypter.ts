export interface Encrypter {
  encrypt(payload: Record<string, unknown>): Promise<string>;
}
