import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error';
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case';

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/sessions')
export class CreateUserController {
  constructor(
    private administratorRegistrationUseCase: AdministratorRegistrationUseCase,
    private registerDeliveryManUseCase: RegisterDeliveryManUseCase,
  ) {}

  @Post('/admin')
  @HttpCode(201)
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

  @Post('/user')
  @HttpCode(201)
  async handlerCreateUser(
    @Body(new ZodValidationPipe(createUserBodySchema))
    body: CreateUserBodySchema,
  ) {
    const { name, cpf, password } = body;
    const administratorId = '32132';
    const result = await this.registerDeliveryManUseCase.execute({
      name,
      cpf,
      password,
      administratorId,
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
