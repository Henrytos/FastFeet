import { AuthenticateAdministratorUseCase } from '@/domain/delivery/application/use-cases/authenticate-administrator-use-case';
import { Public } from '@/infra/auth/public';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Public()
@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateAdministratorUseCase) {}

  @Post()
  async handler(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema,
  ) {
    const { cpf, password } = body;

    const result = await this.authenticateUseCase.execute({ cpf, password });

    if (result.isLeft()) {
      throw new Error(result.value.message);
    }

    return {
      accessToken: result.value.accessToken,
    };
  }
}
