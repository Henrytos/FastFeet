import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

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
  ) {}

  @Post()
  async handler(@Body() body: CreateUserBodySchema) {
    const { name, cpf, password } = body;

    await this.administratorRegistrationUseCase.execute({
      name,
      cpf,
      password,
    });
  }
}
