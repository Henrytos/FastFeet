import { Cpf } from '@/domain/delivery/enterprise/entities/value-object/cpf';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaDeliveryMansRepository } from '@/infra/database/prisma/repositories/prisma-delivery-mans-repository';
import { AdministratorFactory } from '@/test/factories/make-administrator';
import { DeliveryManFactory } from '@/test/factories/make-delivery-man';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('UpdateDeliveryManController (e2e)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let administratorFactory: AdministratorFactory;
  let deliveryManFactory: DeliveryManFactory;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory,DeliveryManFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    administratorFactory = moduleRef.get(AdministratorFactory);
    deliveryManFactory = moduleRef.get(DeliveryManFactory);
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[PUT] /users/{deliveryManId} ', async () => {
    const administrator = await administratorFactory.makePrismaAdministrator({
      name: 'John Doe',
    });
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan({
        name: 'John Doe',
        cpf: Cpf.createFromValue('12345678909'),
        password: '123456',
    })

    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    });

    const response = await request(app.getHttpServer())
      .put(`/users/${deliveryMan.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Updated',
        cpf: '12345678909',
        password: '123456',
      });

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
    const deliveryManOnDatabase =await prisma.user.findUnique({
        where:{
            id: deliveryMan.id
        }
    });
    expect(deliveryManOnDatabase).toMatchObject({
        name: 'John Doe Updated',
        cpf: '12345678909',
    });
   
  });
});
