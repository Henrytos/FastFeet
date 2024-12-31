import { DeleteAnOrderUseCase } from '@/domain/delivery/application/use-cases/delete-an-order-use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const routeParamsDeleteAnOrderSchema = z.object({
  orderId: z.string(),
})
type RouteParamsDeleteAnOrder = z.infer<typeof routeParamsDeleteAnOrderSchema>

@Controller('/orders/:orderId')
export class DeleteAnOrderController {
  constructor(private readonly deleteAnOrderUseCase: DeleteAnOrderUseCase) {}

  @Delete()
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(new ZodValidationPipe(routeParamsDeleteAnOrderSchema))
    { orderId }: RouteParamsDeleteAnOrder,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.deleteAnOrderUseCase.execute({
      orderId,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case OrderDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException('An error occurred')
      }
    }
  }
}
