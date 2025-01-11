import { FetchRecipientUseCase } from '@/domain/delivery/application/use-cases/fetch-recipient-use-case'
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
import { z } from 'zod'
import { Roles } from '../guards/roles.decorator'
import { RolesGuards } from '../guards/roles.guards'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientPresenter } from '../presenters/recipient-presenter'
import { ApiHeader } from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'

const queryParamsFetchRecipientSchema = z.object({
  page: z.coerce.number().optional().default(0),
  perPage: z.coerce.number().optional().default(10),
})

type QueryParamsFetchRecipient = z.infer<typeof queryParamsFetchRecipientSchema>

@Controller('/recipients')
export class FetchRecipientController {
  constructor(private fetchRecipientUseCase: FetchRecipientUseCase) {}

  @Get()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @HttpCode(HttpStatus.OK)
  async handler(
    @Query(new ZodValidationPipe(queryParamsFetchRecipientSchema))
    { page, perPage }: QueryParamsFetchRecipient,
    @CurrentUser() administrator: UserPayload,
  ) {
    const result = await this.fetchRecipientUseCase.execute({
      page,
      perPage,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)

        default:
          throw new BadRequestException(result.value.message)
      }
    }

    return {
      recipients: result.value.recipients.map(RecipientPresenter.toHTTP),
    }
  }
}
