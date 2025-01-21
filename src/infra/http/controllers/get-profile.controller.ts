import { CurrentUser } from '@/infra/auth/current-user'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
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
import { UseRolesGuards } from '../guards/use-roles-guards.decorator'

@ApiTags('profile')
@ApiBearerAuth()
@Controller('/profile')
export class GetProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @UseRolesGuards('ADMINISTRATOR', 'DELIVERY_MAN')
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
