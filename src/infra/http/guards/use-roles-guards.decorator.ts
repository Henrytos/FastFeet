import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { Role as PrismaRole } from '@prisma/client'
import { RolesGuards } from './roles.guards'

export const ROLES_KEY = 'roles'
export const UseRolesGuards = (...roles: PrismaRole[]) => {
  return applyDecorators(UseGuards(RolesGuards), SetMetadata('roles', roles))
}
