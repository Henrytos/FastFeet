import { Module } from '@nestjs/common';

import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';

import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateAdministratorUseCase } from '@/domain/delivery/application/use-cases/authenticate-administrator-use-case';
import { AuthenticateDeliveryManUseCase } from '@/domain/delivery/application/use-cases/authenticate-delivery-man-use-case';
import { GetProfileController } from './controllers/get-profile-controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    GetProfileController,
  ],
  providers: [
    AdministratorRegistrationUseCase,
    RegisterDeliveryManUseCase,
    AuthenticateAdministratorUseCase,
    AuthenticateDeliveryManUseCase,
  ],
})
export class HttpModule {}
