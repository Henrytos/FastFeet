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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { OrderDoesNotExistMessageDTO } from '../dtos/order-does-not-exists-message.dto'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const routeParamsDeleteAnOrderSchema = z.object({
  orderId: z.string(),
})
type RouteParamsDeleteAnOrder = z.infer<typeof routeParamsDeleteAnOrderSchema>

@ApiTags('order')
@ApiBearerAuth()
@Controller('/orders/:orderId')
export class DeleteAnOrderController {
  constructor(private readonly deleteAnOrderUseCase: DeleteAnOrderUseCase) {}

  @Delete()
  @UseGuards(RolesGuards)
  @Roles('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiBearerAuth()
  @ApiParam({
    name: 'orderId',
    type: 'uuid',
    description: 'The ID of the order to be deleted',
    required: true,
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: AdministratorDoesNotExistMessageDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid order ID',
    type: OrderDoesNotExistMessageDTO,
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
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
