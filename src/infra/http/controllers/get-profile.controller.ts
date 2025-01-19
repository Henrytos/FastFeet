import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { Roles } from '../guards/roles.decorator'
import { RolesGuards } from '../guards/roles.guards'
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FORMAT_TOKEN_DTO } from '../dtos/format-token.dto'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UserPresenter } from '../presenters/user-presenter'
import { UserBodyDTO } from '../dtos/user-body.dto'

@ApiTags('profile')
@ApiBearerAuth()
@Controller('/profile')
export class GetProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
  @UseGuards(RolesGuards)
  @ApiHeader(FORMAT_TOKEN_DTO)
  @ApiOkResponse({
    type: UserBodyDTO,
    description: 'User profile',
  })
  @HttpCode(HttpStatus.OK)
  async handler(@CurrentUser() { sub }: UserPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: sub },
    })

    return {
      user: UserPresenter.toHTTP(user),
    }
  }
}
