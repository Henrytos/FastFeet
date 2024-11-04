import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { DeliveryManPresenter } from "../presenters/delivery-man-presenter";
import { Roles } from "../guards/roles.decorator";
import { GetDeliveryManByIdUseCase } from "@/domain/delivery/application/use-cases/get-delivery-man-by-id-use-case";
import { DeliveryManDoesNotExistError } from "@/domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error";
import { WrongCredentialsError } from "@/domain/delivery/application/use-cases/errors/wrong-credentials-error";

@Controller("/deliveryMan/:deliveryManId")
export class GetDeliveryManByIdController {
  constructor(
    private readonly getDeliveryManByIdUseCase: GetDeliveryManByIdUseCase,
  ) {}

  @Get()
  @Roles("ADMINISTRATOR", "DELIVERY_MAN")
  @HttpCode(HttpStatus.OK)
  async handler(@Param("deliveryManId") deliveryManId: string) {
    const result = await this.getDeliveryManByIdUseCase.execute({
      deliveryManId,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManDoesNotExistError:
          throw new BadRequestException(result.value.message);
        case WrongCredentialsError:
          throw new BadRequestException(result.value.message);
        default:
          throw new BadRequestException();
      }
    }

    return {
      user: DeliveryManPresenter.toHTTP(result.value.deliveryMan),
    };
  }
}
