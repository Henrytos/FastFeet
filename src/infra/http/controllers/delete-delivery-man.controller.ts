import { DeleteDeliveryManByIdUseCase } from "@/domain/delivery/application/use-cases/delete-delivery-man-by-id-use-case";
import { DeliveryManDoesNotExistError } from "@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "@/domain/delivery/application/use-cases/errors/wrong-credentials-error";
import { CurrentUser } from "@/infra/auth/current-user";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { RolesGuards } from "../guards/roles.guards";
import { Roles } from "../guards/roles.decorator";

@Controller("/users/:deliveryManId")
export class DeleteDeliveryManController {
  constructor(
    private readonly deleteDeliveryManUseCase: DeleteDeliveryManByIdUseCase,
  ) {}

  @Delete()
  @Roles("ADMINISTRATOR")
  @UseGuards(RolesGuards)
  @HttpCode(HttpStatus.NO_CONTENT)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param("deliveryManId", ParseUUIDPipe) deliveryManId: string,
  ) {
    const result = await this.deleteDeliveryManUseCase.execute({
      administratorId: user.sub,
      deliveryManId,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new NotFoundException(result.value.message);
        case WrongCredentialsError:
          throw new UnauthorizedException(result.value.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
