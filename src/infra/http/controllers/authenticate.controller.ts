import { AuthenticateAdministratorUseCase } from "@/domain/delivery/application/use-cases/authenticate-administrator-use-case";
import { Public } from "@/infra/auth/public";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AuthenticateDeliveryManUseCase } from "@/domain/delivery/application/use-cases/authenticate-delivery-man-use-case";

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Public()
@Controller("/sessions")
export class AuthenticateController {
  constructor(
    private readonly authenticateAdministratorUseCase: AuthenticateAdministratorUseCase,
    private readonly authenticateDeliveryManUseCase: AuthenticateDeliveryManUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async handler(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema,
  ) {
    const { cpf, password } = body;
    const resultAuthenticateUseCaseAdministrator =
      await this.authenticateAdministratorUseCase.execute({
        cpf,
        password,
      });

    if (resultAuthenticateUseCaseAdministrator.isLeft()) {
      throw new Error(resultAuthenticateUseCaseAdministrator.value.message);
    }

    if (resultAuthenticateUseCaseAdministrator.isRight()) {
      return {
        accessToken: resultAuthenticateUseCaseAdministrator.value.accessToken,
      };
    }

    const resultAuthenticateUseCaseDeliveryMan =
      await this.authenticateDeliveryManUseCase.execute({
        cpf,
        password,
      });

    if (resultAuthenticateUseCaseDeliveryMan.isLeft()) {
      throw new Error(resultAuthenticateUseCaseDeliveryMan.value.message);
    }

    if (resultAuthenticateUseCaseDeliveryMan.isRight()) {
      return {
        accessToken: resultAuthenticateUseCaseDeliveryMan.value.accessToken,
      };
    }
  }
}
