import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchOrderByDeliveryManIdUseCase } from '@/domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case'
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
import { FetchSchemaDTO } from '../dtos/fetch-schema.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { $Enums } from '@prisma/client'

const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10),
})

type QueryParams = z.infer<typeof queryParamsSchema>

const routeParamsSchema = z.object({
  deliveryManId: z.string().uuid(),
})

type RouteParams = z.infer<typeof routeParamsSchema>

@ApiTags('delivery-man')
@ApiBearerAuth()
@Controller('/delivery-man/:deliveryManId/deliveries')
export class FetchOrderByDeliveryManIdController {
  constructor(
    private readonly fetchOrderByDeliveryManIdUseCase: FetchOrderByDeliveryManIdUseCase,
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
  })
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized access',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
  async handler(
    @Query(new ZodValidationPipe(queryParamsSchema))
    { page, perPage }: QueryParams,
    @Param(new ZodValidationPipe(routeParamsSchema))
    { deliveryManId }: RouteParams,
  ) {
    const result = await this.fetchOrderByDeliveryManIdUseCase.execute({
      page,
      perPage,
      deliveryManId,
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
      user: result.value.orders.map(OrderPresenter.toHTTP),
    }
  }
}
