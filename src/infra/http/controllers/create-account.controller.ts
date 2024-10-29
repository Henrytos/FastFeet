import { AdministratorRegistrationUseCase } from "@/domain/delivery/application/use-cases/administrator-registration-use-case";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { WrongCredentialsError } from "@/domain/delivery/application/use-cases/errors/wrong-credentials-error";
import { RegisterDeliveryManUseCase } from "@/domain/delivery/application/use-cases/register-delivery-man-use-case";
import { Public } from "@/infra/auth/public";
import { CurrentUser } from "@/infra/auth/current-user";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(
    private readonly administratorRegistrationUseCase: AdministratorRegistrationUseCase,
    private readonly registerDeliveryManUseCase: RegisterDeliveryManUseCase,
  ) { }

  @Public()
  @Post("/admin")
  @HttpCode(HttpStatus.CREATED)
  async handlerCreateAdmin(
    @Body(new ZodValidationPipe(createUserBodySchema))
    body: CreateUserBodySchema,
  ) {
    const { name, cpf, password } = body;

    const result = await this.administratorRegistrationUseCase.execute({
      name,
      cpf,
      password,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new ConflictException(result.value.message);
        default:
          throw new BadRequestException(result.value.message);
      }
    }
  }

  @Post("/user")
  @HttpCode(HttpStatus.CREATED)
  async handlerCreateUser(
    @Body(new ZodValidationPipe(createUserBodySchema))
    body: CreateUserBodySchema,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const { name, cpf, password } = body;
    const result = await this.registerDeliveryManUseCase.execute({
      name,
      cpf,
      password,
      administratorId: currentUser.sub,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case WrongCredentialsError:
          throw new ConflictException(result.value.message);
        default:
          throw new BadRequestException(result.value.message);
      }
    }
  }
}
