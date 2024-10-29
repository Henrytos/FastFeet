import { Cpf } from "@/domain/delivery/enterprise/entities/value-object/cpf";
import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { AdministratorFactory } from "@/test/factories/make-administrator";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("CreateAccountController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let administratorFactory: AdministratorFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    administratorFactory = moduleRef.get(AdministratorFactory);
    await app.init();
  });

  test("[POST] /accounts/admin ", async () => {
    const response = await request(app.getHttpServer())
      .post("/accounts/admin")
      .send({
        name: "John Doe",
        cpf: Cpf.create("12345678901").value,
        password: "password",
      });

    expect(response.status).toBe(HttpStatus.CREATED);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: Cpf.create("12345678901").value,
      },
    });
    expect(userOnDatabase).toBeTruthy();
  });

  test.skip("[POST] /accounts/user ", async () => {
    const administrator = await administratorFactory.makePrismaAdministrator();

    const accessToken = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    });

    const response = await request(app.getHttpServer())
      .post("/accounts/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "John Doe",
        cpf: Cpf.create("12345678902").value,
        password: "password",
      });

    expect(response.status).toBe(HttpStatus.CREATED);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: Cpf.create("12345678902").value,
      },
    });
    expect(userOnDatabase).toBeTruthy();
  });
});
