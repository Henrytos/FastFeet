import { UserPayload } from '@/infra/auth/jwt.strategy';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rolesRequired = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    const { role, sub } = request.user as UserPayload;

    if (!rolesRequired || rolesRequired.length === 0) {
      return true;
    }

    if (!rolesRequired.includes(role)) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return true;
  }
}
