import { Module } from '@nestjs/common';

import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case';

import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [AdministratorRegistrationUseCase],
})
export class HttpModule {}
