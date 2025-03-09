import { Encrypter } from '@/domain/delivery/application/cryptography/encrypter';
import { JwtService } from '@nestjs/jwt';
export declare class JwtEncrypterService implements Encrypter {
    private jwtService;
    constructor(jwtService: JwtService);
    encrypt(payload: Record<string, unknown>): Promise<string>;
}
