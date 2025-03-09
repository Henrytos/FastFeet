import { Role as PrismaRole } from '@prisma/client';
export declare const ROLES_KEY = "roles";
export declare const UseRolesGuards: (...roles: PrismaRole[]) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
