import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { AdministratorFactory } from "@/test/factories/make-administrator";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("CreateAccountController (e2e)", () => {
  let app: INestApplication;
  let jwt: JwtService;
  let administratorFactory: AdministratorFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    administratorFactory = moduleRef.get(AdministratorFactory);
    await app.init();
  });

  test("[GET] /profile ", async () => {
    const administrator = await administratorFactory.makePrismaAdministrator({
      name: "John Doe",
    });

    const token = jwt.sign({
      sub: administrator.id,
      role: administrator.role,
    });

    const response = await request(app.getHttpServer())
      .get("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      user: expect.objectContaining({
        name: "John Doe",
      }),
    });
  });
});
