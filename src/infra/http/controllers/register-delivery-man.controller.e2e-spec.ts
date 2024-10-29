import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { AdministratorFactory } from "@/test/factories/make-administrator";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("UpdateDeliveryManController (e2e)", () => {
    let app: INestApplication;
    let jwt: JwtService;
    let administratorFactory: AdministratorFactory;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule],
            providers: [AdministratorFactory],
        }).compile();

        app = moduleRef.createNestApplication();
        jwt = moduleRef.get(JwtService);
        administratorFactory = moduleRef.get(AdministratorFactory);
        prisma = moduleRef.get(PrismaService);
        await app.init();
    });

    test("[POST] /deliveryMan ", async () => {
        const administrator = await administratorFactory.makePrismaAdministrator();
        const token = jwt.sign({
            sub: administrator.id,
            role: administrator.role,
        });

        const response = await request(app.getHttpServer())
            .post(`/deliveryMan`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "John Doe Updated",
                cpf: "12345678909",
                password: "123456",
            });

        expect(response.status).toBe(HttpStatus.CREATED);

        const deliveryManOnDatabase = await prisma.user.findUnique({
            where: {
                cpf: "12345678909",
            },
        });
        expect(deliveryManOnDatabase).toBeTruthy();
    });
});
