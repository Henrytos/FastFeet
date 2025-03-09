import { Role as PrismaRole } from '@prisma/client';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: PrismaRole[]) => import("@nestjs/common").CustomDecorator<string>;
