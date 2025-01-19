import { FetchRecentOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-recent-order-use-case'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { OrderPresenter } from '../presenters/order-presenter'
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const queryParamsFetchRecentOrdersSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().optional().default(10),
})

type QueryParamsFetchRecentOrders = z.infer<
  typeof queryParamsFetchRecentOrdersSchema
>

@ApiTags('order')
@ApiBearerAuth()
@Controller('/orders')
export class FetchRecentOrderController {
  constructor(
    private readonly fetchRecentOrderUseCase: FetchRecentOrderUseCase,
  ) {}

  @Get()
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  async handler(
    @Query(new ZodValidationPipe(queryParamsFetchRecentOrdersSchema))
    { page, perPage }: QueryParamsFetchRecentOrders,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.fetchRecentOrderUseCase.execute({
      page,
      perPage,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      orders: result.value.orders.map(OrderPresenter.toHTTP),
    }
  }
}
