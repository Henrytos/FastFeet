import { Module } from '@nestjs/common'

import { AdministratorRegistrationUseCase } from '@/domain/delivery/application/use-cases/administrator-registration-use-case'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterDeliveryManUseCase } from '@/domain/delivery/application/use-cases/register-delivery-man-use-case'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/delivery/application/use-cases/authenticate-user-use-case'
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
import { UpdateRecipientController } from './controllers/update-recipient.controller'
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient-use-case'
import { FetchRecipientController } from './controllers/fetch-recipient.controller'
import { FetchRecipientUseCase } from '@/domain/delivery/application/use-cases/fetch-recipient-use-case'
import { RegisterOrderForRecipientUseCase } from '@/domain/delivery/application/use-cases/register-order-for-recipient-use-case'
import { RegisterOrderForRecipientController } from './controllers/register-order-for-recipient.controller'
import { RegisterDeliveryAddressUseCase } from '@/domain/delivery/application/use-cases/register-delivery-address-use-case'
import { DeleteAnOrderController } from './controllers/delete-an-order.controller'
import { DeleteAnOrderUseCase } from '@/domain/delivery/application/use-cases/delete-an-order-use-case'
import { GetORderByIdController } from './controllers/get-order-by-id.controller'
import { GetOrderByIdUseCase } from '@/domain/delivery/application/use-cases/get-order-by-id-use-case'
import { FetchRecentOrderController } from './controllers/fetch-recent-order.controller'
import { FetchRecentOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-recent-order-use-case'
import { SendingOrderToRecipientByDeliveryManController } from './controllers/sending-order-to-recipient-by-delivery-man.controller'
import { SendingOrderToRecipientByDeliveryManUseCase } from '@/domain/delivery/application/use-cases/sending-order-to-recipient-by-delivery-person-use-case'
import { CancelingRecipientOrderController } from './controllers/canceling-recipient-order.controller'
import { CancelingRecipientOrderUseCase } from '@/domain/delivery/application/use-cases/canceling-recipient-order-use-case'
<<<<<<< HEAD
import { MarkAnOrderAsDeliveredController } from './controllers/makr-an-order-as-delivered.controller'
=======
import { MarkAnOrderAsDeliveredController } from './controllers/mark-an-order-as-delivered.controller'
>>>>>>> fb20f51c68cf9dda37ae59f621ee1b420f94ae03
import { MarkAnOrderAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case'

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
    UpdateRecipientController,
    FetchRecipientController,
    RegisterOrderForRecipientController,
    DeleteAnOrderController,
    GetORderByIdController,
    FetchRecentOrderController,
    SendingOrderToRecipientByDeliveryManController,
    CancelingRecipientOrderController,
    MarkAnOrderAsDeliveredController,
  ],
  providers: [
    AdministratorRegistrationUseCase,
    RegisterDeliveryManUseCase,
    AuthenticateUserUseCase,
    AuthenticateUserUseCase,
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
    UpdateRecipientUseCase,
    FetchRecipientUseCase,
    RegisterOrderForRecipientUseCase,
    RegisterDeliveryAddressUseCase,
    DeleteAnOrderUseCase,
    GetOrderByIdUseCase,
    FetchRecentOrderUseCase,
    SendingOrderToRecipientByDeliveryManUseCase,
    CancelingRecipientOrderUseCase,
    MarkAnOrderAsDeliveredUseCase,
  ],
})
export class HttpModule {}
