import { AdministratorsRepository } from '@/domain/delivery/application/repositories/administrators-repository';
import { DeliveryMansRepository } from '@/domain/delivery/application/repositories/delivery-mans-repository';
import { CurrentUser } from '@/infra/auth/current-user';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { Controller, Get } from '@nestjs/common';
import { DeliveryManPresenter } from '../presenters/delivery-man-presenter';
import { AdministratorPresenter } from '../presenters/administrator-presenter';

@Controller('/profile')
export class GetProfileController {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliveryMansRepository: DeliveryMansRepository,
  ) {}

  @Get()
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
