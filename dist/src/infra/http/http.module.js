"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const administrator_registration_use_case_1 = require("../../domain/delivery/application/use-cases/administrator-registration-use-case");
const cryptography_module_1 = require("../cryptography/cryptography.module");
const database_module_1 = require("../database/database.module");
const create_account_controller_1 = require("./controllers/create-account.controller");
const register_delivery_man_use_case_1 = require("../../domain/delivery/application/use-cases/register-delivery-man-use-case");
const authenticate_controller_1 = require("./controllers/authenticate.controller");
const authenticate_user_use_case_1 = require("../../domain/delivery/application/use-cases/authenticate-user-use-case");
const get_profile_controller_1 = require("./controllers/get-profile.controller");
const delete_delivery_man_controller_1 = require("./controllers/delete-delivery-man.controller");
const update_delivery_man_controller_1 = require("./controllers/update-delivery-man.controller");
const change_delivery_man_password_controller_1 = require("./controllers/change-delivery-man-password.controller");
const delete_delivery_man_by_id_use_case_1 = require("../../domain/delivery/application/use-cases/delete-delivery-man-by-id-use-case");
const update_delivery_man_by_administrator_1 = require("../../domain/delivery/application/use-cases/update-delivery-man-by-administrator");
const change_delivery_man_password_use_case_1 = require("../../domain/delivery/application/use-cases/change-delivery-man-password-use-case");
const guards_module_1 = require("./guards/guards.module");
const register_delivery_man_controller_1 = require("./controllers/register-delivery-man.controller");
const get_delivery_man_by_id_controller_1 = require("./controllers/get-delivery-man-by-id.controller");
const get_delivery_man_by_id_use_case_1 = require("../../domain/delivery/application/use-cases/get-delivery-man-by-id-use-case");
const fetch_delivery_man_use_case_1 = require("../../domain/delivery/application/use-cases/fetch-delivery-man-use-case");
const fetch_delivery_man_controller_1 = require("./controllers/fetch-delivery-man.controller");
const fetch_order_by_delivery_man_id_use_case_1 = require("../../domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case");
const fetch_order_by_delivery_man_id_controller_1 = require("./controllers/fetch-order-by-delivery-man-id.controller");
const register_recipient_controller_1 = require("./controllers/register-recipient.controller");
const register_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/register-recipient-use-case");
const delete_recipient_controller_1 = require("./controllers/delete-recipient.controller");
const delete_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/delete-recipient-use-case");
const get_recipient_controller_1 = require("./controllers/get-recipient.controller");
const get_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/get-recipient-use-case");
const update_recipient_controller_1 = require("./controllers/update-recipient.controller");
const update_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/update-recipient-use-case");
const fetch_recipient_controller_1 = require("./controllers/fetch-recipient.controller");
const fetch_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/fetch-recipient-use-case");
const register_order_for_recipient_use_case_1 = require("../../domain/delivery/application/use-cases/register-order-for-recipient-use-case");
const register_order_for_recipient_controller_1 = require("./controllers/register-order-for-recipient.controller");
const register_delivery_address_use_case_1 = require("../../domain/delivery/application/use-cases/register-delivery-address-use-case");
const delete_an_order_controller_1 = require("./controllers/delete-an-order.controller");
const delete_an_order_use_case_1 = require("../../domain/delivery/application/use-cases/delete-an-order-use-case");
const get_order_by_id_controller_1 = require("./controllers/get-order-by-id.controller");
const get_order_by_id_use_case_1 = require("../../domain/delivery/application/use-cases/get-order-by-id-use-case");
const fetch_recent_order_controller_1 = require("./controllers/fetch-recent-order.controller");
const fetch_recent_order_use_case_1 = require("../../domain/delivery/application/use-cases/fetch-recent-order-use-case");
const sending_order_to_recipient_by_delivery_man_controller_1 = require("./controllers/sending-order-to-recipient-by-delivery-man.controller");
const sending_order_to_recipient_by_delivery_person_use_case_1 = require("../../domain/delivery/application/use-cases/sending-order-to-recipient-by-delivery-person-use-case");
const canceling_recipient_order_controller_1 = require("./controllers/canceling-recipient-order.controller");
const canceling_recipient_order_use_case_1 = require("../../domain/delivery/application/use-cases/canceling-recipient-order-use-case");
const mark_an_order_as_delivered_use_case_1 = require("../../domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case");
const mark_an_order_as_delivered_controller_1 = require("./controllers/mark-an-order-as-delivered.controller");
const update_order_controller_1 = require("./controllers/update-order.controller");
const update_order_use_case_1 = require("../../domain/delivery/application/use-cases/update-order-use-case");
const update_delivery_address_use_case_1 = require("../../domain/delivery/application/use-cases/update-delivery-address-use-case");
const upload_photo_for_storage_controller_1 = require("./controllers/upload-photo-for-storage.controller");
const upload_and_create_photo_use_case_1 = require("../../domain/delivery/application/use-cases/upload-and-create-photo-use-case");
const storage_module_1 = require("./storage/storage.module");
const events_module_1 = require("../events/events.module");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            cryptography_module_1.CryptographyModule,
            guards_module_1.GuardsModule,
            storage_module_1.StorageModule,
            events_module_1.EventsModule,
        ],
        controllers: [
            authenticate_controller_1.AuthenticateController,
            create_account_controller_1.CreateAccountController,
            get_profile_controller_1.GetProfileController,
            delete_delivery_man_controller_1.DeleteDeliveryManController,
            update_delivery_man_controller_1.UpdateDeliveryManController,
            change_delivery_man_password_controller_1.ChangeDeliveryManPasswordController,
            register_delivery_man_controller_1.RegisterDeliveryManController,
            get_delivery_man_by_id_controller_1.GetDeliveryManByIdController,
            fetch_delivery_man_controller_1.FetchDeliveryManController,
            fetch_order_by_delivery_man_id_controller_1.FetchOrderByDeliveryManIdController,
            register_recipient_controller_1.RegisterRecipientController,
            delete_recipient_controller_1.DeleteRecipientController,
            get_recipient_controller_1.GetRecipientController,
            update_recipient_controller_1.UpdateRecipientController,
            fetch_recipient_controller_1.FetchRecipientController,
            register_order_for_recipient_controller_1.RegisterOrderForRecipientController,
            delete_an_order_controller_1.DeleteAnOrderController,
            get_order_by_id_controller_1.GetORderByIdController,
            fetch_recent_order_controller_1.FetchRecentOrderController,
            sending_order_to_recipient_by_delivery_man_controller_1.SendingOrderToRecipientByDeliveryManController,
            canceling_recipient_order_controller_1.CancelingRecipientOrderController,
            mark_an_order_as_delivered_controller_1.MarkAnOrderAsDeliveredController,
            update_order_controller_1.UpdateOrderCOntroller,
            upload_photo_for_storage_controller_1.UploadPhotoForStorageController,
        ],
        providers: [
            administrator_registration_use_case_1.AdministratorRegistrationUseCase,
            register_delivery_man_use_case_1.RegisterDeliveryManUseCase,
            authenticate_user_use_case_1.AuthenticateUserUseCase,
            authenticate_user_use_case_1.AuthenticateUserUseCase,
            delete_delivery_man_by_id_use_case_1.DeleteDeliveryManByIdUseCase,
            update_delivery_man_by_administrator_1.UpdateDeliveryManByAdministratorUseCase,
            change_delivery_man_password_use_case_1.ChangeDeliveryManPasswordUseCase,
            get_delivery_man_by_id_use_case_1.GetDeliveryManByIdUseCase,
            fetch_delivery_man_use_case_1.FetchDeliveryMansUseCase,
            fetch_order_by_delivery_man_id_use_case_1.FetchOrderByDeliveryManIdUseCase,
            fetch_order_by_delivery_man_id_use_case_1.FetchOrderByDeliveryManIdUseCase,
            register_recipient_use_case_1.RegisterRecipientUseCase,
            delete_recipient_use_case_1.DeleteRecipientUseCase,
            get_recipient_use_case_1.GetRecipientUseCase,
            update_recipient_use_case_1.UpdateRecipientUseCase,
            fetch_recipient_use_case_1.FetchRecipientUseCase,
            register_order_for_recipient_use_case_1.RegisterOrderForRecipientUseCase,
            register_delivery_address_use_case_1.RegisterDeliveryAddressUseCase,
            delete_an_order_use_case_1.DeleteAnOrderUseCase,
            get_order_by_id_use_case_1.GetOrderByIdUseCase,
            fetch_recent_order_use_case_1.FetchRecentOrderUseCase,
            sending_order_to_recipient_by_delivery_person_use_case_1.SendingOrderToRecipientByDeliveryManUseCase,
            canceling_recipient_order_use_case_1.CancelingRecipientOrderUseCase,
            mark_an_order_as_delivered_use_case_1.MarkAnOrderAsDeliveredUseCase,
            update_order_use_case_1.UpdateOrderUseCase,
            update_delivery_address_use_case_1.UpdateDeliveryAddressUseCase,
            upload_and_create_photo_use_case_1.UploadPhotoForStorageUseCase,
        ],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map