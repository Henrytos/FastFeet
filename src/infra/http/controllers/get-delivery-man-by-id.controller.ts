import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter'
import { GetDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/get-delivery-man-by-id-use-case'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { DeliveryManDoesNotExistMessageDTO } from '../dtos/delivery-man-does-not-exist-message.dto'
import { DeliveryManDTO } from '../dtos/delivery-man.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'

const routeParamsGetDeliveryManSchema = z.object({
  deliveryManId: z.string().uuid(),
})

type RouteParamsGetDeliveryMan = z.infer<typeof routeParamsGetDeliveryManSchema>

@ApiTags('delivery-man')
@ApiBearerAuth()
@Controller('/delivery-mans/:deliveryManId')
export class GetDeliveryManByIdController {
  constructor(
    private readonly getDeliveryManByIdUseCase: GetDeliveryManByIdUseCase,
  ) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'deliveryManId',
    type: 'string',
    required: true,
    format: 'uuid',
  })
  @ApiOkResponse({
    type: DeliveryManDTO,
    description: 'Delivery man details',
  })
  @ApiBadRequestResponse({
    type: DeliveryManDoesNotExistMessageDTO,
  })
  @ApiInternalServerErrorResponse()
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
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      user: DeliveryManPresenter.toHTTP(result.value.deliveryMan),
    }
  }
}
