import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter'
import { Roles } from '../guards/roles.decorator'
import { FetchDeliveryMansUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-man-use-case'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RolesGuards } from '../guards/roles.guards'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ApiHeader } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  perPage: z.coerce.number().min(1).optional().default(10),
})

type QueryParams = z.infer<typeof queryParamsSchema>

@Controller('/deliverymen')
export class FetchDeliveryManController {
  constructor(
    private readonly fetchDeliveryMansUseCase: FetchDeliveryMansUseCase,
  ) {}

  @Get()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
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
          throw new BadRequestException()
      }
    }

    return {
      user: result.value.deliveryMans.map(DeliveryManPresenter.toHTTP),
    }
  }
}
