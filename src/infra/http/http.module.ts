import { Module } from '@nestjs/common'

import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateAdministratorUseCase } from '@/domain/delivery/application/use-cases/authenticate-administrator-use-case'
import { AuthenticateDeliveryManUseCase } from '@/domain/delivery/application/use-cases/authenticate-delivery-man-use-case'
import { GetProfileController } from './controllers/get-profile.controller'
import { DeleteDeliveryManController } from './controllers/delete-delivery-man.controller'
import { UpdateDeliveryManController } from './controllers/update-delivery-man.controller'
import { ChangeDeliveryManPasswordController } from './controllers/change-delivery-man-password.controller'
import { DeleteDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/delete-delivery-man-by-id-use-case'
import { UpdateDeliveryManByAdministratorUseCase } from '@/domain/delivery/application/use-cases/update-delivery-man-by-administrator'
import { ChangeDeliveryManPasswordUseCase } from '@/domain/delivery/application/use-cases/change-delivery-man-password-use-case'
import { GuardsModule } from './guards/guards.module'
import { RegisterDeliveryManController } from './controllers/register-delivery-man.controller'
import { GetDeliveryManByIdController } from './controllers/get-delivery-man-by-id.controller'
import { GetDeliveryManByIdUseCase } from '@/domain/delivery/application/use-cases/get-delivery-man-by-id-use-case'
import { FetchDeliveryMansUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-man-use-case'
import { FetchDeliveryManController } from './controllers/fetch-delivery-man.controller'
import { FetchOrderByDeliveryManIdUseCase } from '@/domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case'
import { FetchOrderByDeliveryManIdController } from './controllers/fetch-order-by-delivery-man-id.controller'
import { RegisterRecipientController } from './controllers/register-recipient.controller'
import { RegisterRecipientUseCase } from '@/domain/delivery/application/use-cases/register-recipient-use-case'
import { DeleteRecipientController } from './controllers/delete-recipient.controller'
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient-use-case'
import { GetRecipientController } from './controllers/get-recipient.controller'
import { GetRecipientUseCase } from '@/domain/delivery/application/use-cases/get-recipient-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule, GuardsModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    GetProfileController,
    DeleteDeliveryManController,
    UpdateDeliveryManController,
    ChangeDeliveryManPasswordController,
    RegisterDeliveryManController,
    GetDeliveryManByIdController,
    FetchDeliveryManController,
    FetchOrderByDeliveryManIdController,
    RegisterRecipientController,
    DeleteRecipientController,
    GetRecipientController,
  ],
  providers: [
    AdministratorRegistrationUseCase,
    RegisterDeliveryManUseCase,
    AuthenticateAdministratorUseCase,
    AuthenticateDeliveryManUseCase,
    DeleteDeliveryManByIdUseCase,
    UpdateDeliveryManByAdministratorUseCase,
    ChangeDeliveryManPasswordUseCase,
    GetDeliveryManByIdUseCase,
    FetchDeliveryMansUseCase,
    FetchOrderByDeliveryManIdUseCase,
    FetchOrderByDeliveryManIdUseCase,
    RegisterRecipientUseCase,
    DeleteRecipientUseCase,
    GetRecipientUseCase,
  ],
})
export class HttpModule {}
