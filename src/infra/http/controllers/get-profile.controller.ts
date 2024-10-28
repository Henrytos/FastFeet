import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository';
import { CurrentUser } from '@/infra/auth/current-user';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter';
import { AdministratorPresenter } from '../presenters/administrator-presenter';
import { Roles } from '../guards/roles.decorator';

@Controller('/profile')
export class GetProfileController {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
  ) {}

  @Get()
  @Roles('ADMINISTRATOR', 'DELIVERY_MAN')
  @HttpCode(HttpStatus.OK)
  async handler(@CurrentUser() user: UserPayload) {
    const { sub: userId } = user;

    const administrator = await this.administratorsRepository.findById(userId);
    if (administrator) {
      return { user: AdministratorPresenter.toHTTP(administrator) };
    }

    const deliveryMan = await this.deliveryMansRepository.findById(userId);
    if (deliveryMan) {
      return { user: DeliveryManPresenter.toHTTP(deliveryMan) };
    }
  }
}
