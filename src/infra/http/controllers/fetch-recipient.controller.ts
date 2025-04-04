import { FetchRecipientUseCase } from '@/domain/delivery/application/use-cases/fetch-recipient-use-case'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientPresenter } from '../presenters/recipient-presenter'
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

const queryParamsFetchRecipientSchema = z.object({
  page: z.coerce.number().optional().default(0),
  perPage: z.coerce.number().optional().default(10),
})

type QueryParamsFetchRecipient = z.infer<typeof queryParamsFetchRecipientSchema>

@ApiTags('recipient')
@ApiBearerAuth()
@Controller('/recipients')
export class FetchRecipientController {
  constructor(private fetchRecipientUseCase: FetchRecipientUseCase) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR')
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiQuery({
    type: FetchSchemaDTO,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        recipients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'uuid' },
              name: { type: 'string' },
              email: { type: 'string' },
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
