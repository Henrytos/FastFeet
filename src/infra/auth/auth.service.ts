import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { name: username },
    });

    const passwordMatch = await compare(pass, user.passwordHash);

    if (user && passwordMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }
}
