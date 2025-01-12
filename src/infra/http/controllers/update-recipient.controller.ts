import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient-use-case'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { RecipientBodyDTO } from '../dtos/recipient-body.dto'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { RecipientDoesNotExistErrorMessageDTO } from '../dtos/recipient-does-note-exist-message.dto'

const updateRecipientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})
type UpdateRecipientBody = z.infer<typeof updateRecipientBodySchema>

const updateRecipientParams = z.object({
  recipientId: z.string().uuid(),
})
type UpdateRecipientParams = z.infer<typeof updateRecipientParams>

@ApiTags('recipient')
@ApiBearerAuth()
@Controller('/recipients/:recipientId')
export class UpdateRecipientController {
  constructor(private updateRecipientUseCase: UpdateRecipientUseCase) {}

  @Put()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiParam({
    name: 'recipientId',
    description: 'The recipient id',
    type: 'string',
    required: true,
  })
  @ApiBody({
    description: 'The recipient data',
    required: true,
    type: RecipientBodyDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: AdministratorDoesNotExistMessageDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid recipient data',
    type: RecipientDoesNotExistErrorMessageDTO,
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Body(new ZodValidationPipe(updateRecipientBodySchema))
    recipient: UpdateRecipientBody,
    @Param(new ZodValidationPipe(updateRecipientParams))
    { recipientId }: UpdateRecipientParams,
    @CurrentUser() administrator: UserPayload,
  ) {
    const { email, name } = recipient

    const result = await this.updateRecipientUseCase.execute({
      name,
      email,
      recipientId,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      message: 'recipient updated successfully',
    }
  }
}
