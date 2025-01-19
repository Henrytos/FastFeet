import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { RegisterRecipientUseCase } from '@/domain/delivery/application/use-cases/register-recipient-use-case'
import { RolesGuards } from '../guards/roles.guards'
import { Roles } from '../guards/roles.decorator'
import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AdministratorDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/administrator-does-not-exist-error'
import { DeliveryAddressDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error'
import { RecipientDoesNotExistError } from '@/domain/delivery/application/use-cases/errors/recipient-does-not-exist-error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { RecipientBodyDTO } from '../dtos/recipient-body.dto'
import { AdministratorDoesNotExistMessageDTO } from '../dtos/administrator-does-not-exist-message.dto'
import { RecipientDoesNotExistErrorMessageDTO } from '../dtos/recipient-does-note-exist-message.dto'
import { DeliveryAddressDoesNotExistMessageDTO } from '../dtos/delivery-address-does-not-exist-messge.dto'

const registerRecipientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

type RegisterRecipientBody = z.infer<typeof registerRecipientBodySchema>

@ApiTags('recipient')
@ApiBearerAuth()
@Controller('/recipients')
export class RegisterRecipientController {
  constructor(private registerRecipientUseCase: RegisterRecipientUseCase) {}

  @Post()
  @Roles('ADMINISTRATOR')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiBody({
    type: RecipientBodyDTO,
    description: 'Recipient data',
    required: true,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Recipient created successfully',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: AdministratorDoesNotExistMessageDTO,
    description: 'Administrator does not exist',
  })
  @ApiBadRequestResponse({
    type: DeliveryAddressDoesNotExistMessageDTO,
    description: 'Delivery address does not exist',
  })
  @ApiBadRequestResponse({
    type: RecipientDoesNotExistErrorMessageDTO,
    description: 'Recipient already exists',
  })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  async handler(
    @Body(new ZodValidationPipe(registerRecipientBodySchema))
    recipient: RegisterRecipientBody,
    @CurrentUser() administrator: UserPayload,
  ) {
    const { email, name } = recipient
    const result = await this.registerRecipientUseCase.execute({
      name,
      email,
      administratorId: administrator.sub,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AdministratorDoesNotExistError:
          throw new UnauthorizedException(result.value.message)
        case DeliveryAddressDoesNotExistError:
          throw new BadRequestException(result.value.message)
        case RecipientDoesNotExistError:
          throw new BadRequestException(result.value.message)
        default:
          throw new InternalServerErrorException(result.value.message)
      }
    }

    return {
      message: 'Recipient created successfully',
    }
  }
}
