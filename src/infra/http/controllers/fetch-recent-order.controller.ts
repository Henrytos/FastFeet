import { FetchRecentOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-recent-order-use-case'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { OrderPresenter } from '../presenters/order-presenter'
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { FetchSchemaDTO } from '../dtos/fetch-schema.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { $Enums } from '@prisma/client'

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
  @UseRolesGuards('ADMINISTRATOR', 'DELIVERY_MAN')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiQuery({
    type: FetchSchemaDTO,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        orders: {
          type: 'array',
          items: {
            properties: {
              user: {
                type: 'array',
                items: {
                  properties: {
                    id: { type: 'uuid' },
                    deliveryManId: { type: 'uuid' },
                    recipientId: { type: 'uuid' },
                    deliveryAddressId: { type: 'uuid' },
                    photoId: { type: 'uuid' },
                    status: { type: 'string', example: $Enums.OrderStatus },
                    deliveryAt: { type: 'string', format: 'date-time' },
                    withdrawnAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    createdAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized access',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
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
