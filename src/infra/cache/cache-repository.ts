export abstract class CacheRepository {
  abstract get(key: string): Promise<string | null>
  abstract set(key: string, value: string): Promise<void>
  abstract delete(key: string): Promise<void>
}
