import { Module } from '@nestjs/common';

import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';

import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateUserController } from './controllers/create-user.controller';
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case';
import { AuthController } from './controllers/sing-in.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, AuthController],
  providers: [AdministratorRegistrationUseCase, RegisterDeliveryManUseCase],
})
export class HttpModule {}
