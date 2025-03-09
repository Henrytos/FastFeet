import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator';
export declare class HashGeneratorService implements HashGenerator {
    private salt;
    hash(plain: string): Promise<string>;
}
