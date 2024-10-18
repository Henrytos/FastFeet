import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { name } from 'typescipt';

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /profile ', async () => {
    const administrator = await prisma.user.create({
      data: {
        name: 'John Doe',
        cpf: '12345678901',
        passwordHash: await hash('password', 8),
        role: 'ADMINISTRATOR',
      },
    });

    const token = jwt.sign({ sub: administrator.id, role: administrator.role });

    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: {
        name: 'John Doe',
        cpf: '12345678901',
        role: 'ADMINISTRATOR',
      },
    });
  });
});
