import { SetMetadata } from "@nestjs/common";
import { Role as PrismaRole } from "@prisma/client";

export const ROLES_KEY = "roles";
export const Roles = (...roles: PrismaRole[]) => SetMetadata("roles", roles);
