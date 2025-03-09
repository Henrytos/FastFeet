import { Strategy } from 'passport-jwt';
import { EnvService } from '../env/env.service';
import { z } from 'zod';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodString;
    role: z.ZodEnum<["ADMINISTRATOR", "DELIVERY_MAN"]>;
}, "strip", z.ZodTypeAny, {
    sub?: string;
    role?: "ADMINISTRATOR" | "DELIVERY_MAN";
}, {
    sub?: string;
    role?: "ADMINISTRATOR" | "DELIVERY_MAN";
}>;
export type UserPayload = z.infer<typeof tokenPayloadSchema>;
declare const AuthStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthStrategy extends AuthStrategy_base {
    constructor(envService: EnvService);
    validate(payload: UserPayload): Promise<{
        sub?: string;
        role?: "ADMINISTRATOR" | "DELIVERY_MAN";
    }>;
}
export {};
