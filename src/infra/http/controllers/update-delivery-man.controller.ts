import { UpdateDeliveryManByAdministratorUseCase } from '@/domain/delivery/application/use-cases/update-delivery-man-by-administrator';
import { CurrentUser } from '@/infra/auth/current-user';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error';

const updateDeliveryManBodySchema = z.object({
  name: z.string(),
  password: z.string().min(6).max(20),
  cpf: z.string().length(11),
});

type UpdateDeliveryManBodySchema = z.infer<typeof updateDeliveryManBodySchema>;

@Controller('/users/{deliveryManId}')
export class UpdateDeliveryManController {
  constructor(
    private updateDeliveryManByAdministratorUseCase: UpdateDeliveryManByAdministratorUseCase,
  ) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('deliveryManId', ParseUUIDPipe) deliveryManId: string,
    @Body(new ZodValidationPipe(updateDeliveryManBodySchema))
    body: UpdateDeliveryManBodySchema,
  ) {
    const { name, password, cpf } = body;

    const result = await this.updateDeliveryManByAdministratorUseCase.execute({
      administratorId: user.sub,
      deliveryManId,
      cpf,
      name,
      password,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
