import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaDeliveryAddressRepository } from "@/infra/database/prisma/repositories/prisma-delivery-address-repository";
import { AdministratorFactory } from "@/test/factories/make-administrator";
import { DeliveryManFactory } from "@/test/factories/make-delivery-man";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { compare, hash } from "bcryptjs";
import request from "supertest";

describe("ChangeDeliveryManPasswordController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let deliveryManFactory: DeliveryManFactory;
  let administratorFactory: AdministratorFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryManFactory, AdministratorFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    deliveryManFactory = moduleRef.get(DeliveryManFactory);
    administratorFactory = moduleRef.get(AdministratorFactory);

    await app.init();
  });

  test("[PATCH] /users/{deliveryManCpf}/password", async () => {
    const administrator = await administratorFactory.makePrismaAdministrator();
    const deliveryMan = await deliveryManFactory.makePrismaDeliveryMan({
      password: await hash("password", 8),
    });

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    });

    const response = await request(app.getHttpServer())
      .patch(`/users/${deliveryMan.cpf}/password`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        password: "new password",
      });

    expect(response.status).toBe(HttpStatus.NO_CONTENT);

    const deliveryManInDatabase = await prisma.user.findUnique({
      where: {
        cpf: deliveryMan.cpf,
      },
    });

    const isPasswordMatch = await compare(
      'new password',
      deliveryManInDatabase.passwordHash,
    );

    expect(isPasswordMatch).toBe(true);
  });
});
