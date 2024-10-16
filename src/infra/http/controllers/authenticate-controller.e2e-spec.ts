import { AppModule } from '@/infra/app.module';
import { HashGeneratorService } from '@/infra/cryptography/hash-generator.service';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { name } from 'typescipt';

describe('CreateAccountController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let hashGenerator: HashGeneratorService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions ', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        cpf: '12345678901',
        passwordHash: await hash('password', 8),
      },
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: '12345678901',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
