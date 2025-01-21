import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter'
import { FetchDeliveryMansUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-man-use-case'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
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

const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10),
})

type QueryParams = z.infer<typeof queryParamsSchema>

@ApiTags('delivery-man')
@ApiBearerAuth()
@Controller('/delivery-mans')
export class FetchDeliveryManController {
  constructor(
    private readonly fetchDeliveryMansUseCase: FetchDeliveryMansUseCase,
  ) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiQuery({
    type: FetchSchemaDTO,
  })
  @ApiOkResponse({})
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Unauthorized access',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.OK)
  async handler(
    @CurrentUser() { sub }: UserPayload,
    @Query(new ZodValidationPipe(queryParamsSchema))
    { page, perPage }: QueryParams,
  ) {
    const result = await this.fetchDeliveryMansUseCase.execute({
      page,
      perPage,
      administratorId: sub,
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
      user: result.value.deliveryMans.map(DeliveryManPresenter.toHTTP),
    }
  }
}
