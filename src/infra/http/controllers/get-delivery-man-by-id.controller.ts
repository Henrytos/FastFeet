import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common'
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter'
import { Roles } from '../guards/roles.decorator'
import { GetDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/get-delivery-man-by-id-use-case'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { WrongCredentialsError } from '@/domain/delivery/application/use-cases/errors/wrong-credentials-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ApiHeader } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const routeParamsGetDeliveryManSchema = z.object({
  deliveryManId: z.string().uuid(),
})

type RouteParamsGetDeliveryMan = z.infer<typeof routeParamsGetDeliveryManSchema>

@Controller('/user/:deliveryManId')
export class GetDeliveryManByIdController {
  constructor(
    private readonly getDeliveryManByIdUseCase: GetDeliveryManByIdUseCase,
  ) {}

  @Get()
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @HttpCode(HttpStatus.OK)
  async handler(
    @Param(new ZodValidationPipe(routeParamsGetDeliveryManSchema))
    { deliveryManId }: RouteParamsGetDeliveryMan,
  ) {
    const result = await this.getDeliveryManByIdUseCase.execute({
      deliveryManId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case WrongCredentialsError:
          throw new BadRequestException(result.value.message)
        default:
          throw new BadRequestException()
      }
    }

    return {
      user: DeliveryManPresenter.toHTTP(result.value.deliveryMan),
    }
  }
}
