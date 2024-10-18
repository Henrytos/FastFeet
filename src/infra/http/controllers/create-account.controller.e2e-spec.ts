import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

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

  test('[POST] /accounts/admin ', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts/admin')
      .send({
        name: 'John Doe',
        cpf: '12345678901',
        password: 'password',
      });

    expect(response.status).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: Cpf.createFromValue('12345678901').value,
      },
    });
    expect(userOnDatabase).toBeTruthy();
  });

  test('[POST] /accounts/user ', async () => {
    const administrator = await prisma.user.create({
      data: {
        name: 'John Doe',
        cpf: '12345678901',
        passwordHash: 'password',
        role: 'ADMINISTRATOR',
      },
    });

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    });

    const response = await request(app.getHttpServer())
      .post('/accounts/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        cpf: '12345678902',
        password: 'password',
      });

    expect(response.status).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: Cpf.createFromValue('12345678902').value,
      },
    });
    expect(userOnDatabase).toBeTruthy();
  });
});
