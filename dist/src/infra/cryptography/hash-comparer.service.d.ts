import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer';
export declare class HashComparerService implements HashComparer {
    comparer(value: string, hash: string): Promise<boolean>;
}
