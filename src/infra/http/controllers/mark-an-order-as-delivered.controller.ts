import { MarkAnOrderAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { OrderDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/order-does-not-exist-error'
import { PhotoDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/photo-does-not-exist-error'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

const RouteParamMarkAnOrderAsDeliveredSchema = z.object({
  orderId: z.string().uuid(),
})

type RouteParamMarkAnOrderAsDelivered = z.infer<
  typeof RouteParamMarkAnOrderAsDeliveredSchema
>

const bodyMarkAnOrderAsDeliveredSchema = z.object({
  photoId: z.string().uuid(),
})

type BodyMarkAnOrderAsDelivered = z.infer<
  typeof bodyMarkAnOrderAsDeliveredSchema
>

@Controller('/orders/:orderId/delivered')
@ApiTags('order')
@ApiBearerAuth()
export class MarkAnOrderAsDeliveredController {
  constructor(
    private readonly markAnOrderAsDeliveredUseCase: MarkAnOrderAsDeliveredUseCase,
  ) {}

  @Patch()
  @UseRolesGuards('DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async handler(
    @Param(new ZodValidationPipe(RouteParamMarkAnOrderAsDeliveredSchema))
    { orderId }: RouteParamMarkAnOrderAsDelivered,
    @CurrentUser() { sub: deliveryManId }: UserPayload,
    @Body(new ZodValidationPipe(bodyMarkAnOrderAsDeliveredSchema))
    { photoId }: BodyMarkAnOrderAsDelivered,
  ) {
    const result = await this.markAnOrderAsDeliveredUseCase.execute({
      deliveryManId,
      orderId,
      photoId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case OrderDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case PhotoDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return { message: 'Order marked as delivered successfully' }
  }
}
