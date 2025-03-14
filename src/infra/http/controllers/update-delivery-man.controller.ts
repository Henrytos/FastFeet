import { UpdateDeliveryManByAdministratorUseCase } from '@/domain/delivery/application/use-cases/update-delivery-man-by-administrator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { DeliveryManDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { DeliveryManDoesNotExistMessageDTO } from '../dtos/delivery-man-does-not-exist-message.dto'
import { DeliveryManBodyDTO } from '../dtos/delivery-man-body.dto'
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'

const updateDeliveryManBodySchema = z.object({
  name: z.string(),
  password: z.string().min(6).max(20),
  cpf: z.string().length(11),
})

type UpdateDeliveryManBodySchema = z.infer<typeof updateDeliveryManBodySchema>

@ApiTags('delivery-man')
@ApiBearerAuth()
@Controller('/delivery-mans/:deliveryManId')
export class UpdateDeliveryManController {
  constructor(
    private readonly updateDeliveryManByAdministratorUseCase: UpdateDeliveryManByAdministratorUseCase,
  ) {}

  @Put()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'deliveryManId',
    type: 'string',
    required: true,
    format: 'uuid',
  })
  @ApiBody({
    type: DeliveryManBodyDTO,
  })
  @ApiOkResponse({
    description: 'Update delivery man data',
    schema: {
      example: {
        message: 'Delivery man updated successfully',
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Administrator does not exist',
  })
  @ApiBadRequestResponse({
    type: DeliveryManDoesNotExistMessageDTO,
    description: 'Delivery man does not exist',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('deliveryManId', ParseUUIDPipe) deliveryManId: string,
    @Body(new ZodValidationPipe(updateDeliveryManBodySchema))
    body: UpdateDeliveryManBodySchema,
  ) {
    const { name, password, cpf } = body

    const result = await this.updateDeliveryManByAdministratorUseCase.execute({
      administratorId: user.sub,
      deliveryManId,
      cpf,
      name,
      password,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case DeliveryManDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException()
      }
    }

    return {
      message: 'Delivery man updated successfully',
    }
  }
}
