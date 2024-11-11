import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
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

@Controller('/users')
export class FetchDeliveryManController {
  constructor(
    private readonly fetchDeliveryMansUseCase: FetchDeliveryMansUseCase,
  ) {}

  @Get()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @HttpCode(HttpStatus.OK)
  async handler(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @CurrentUser() { sub }: UserPayload,
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
