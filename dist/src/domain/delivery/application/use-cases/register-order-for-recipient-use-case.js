"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterOrderForRecipientUseCase = void 0;
const either_1 = require("../../../../core/either");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const administrators_repository_1 = require("../repositories/administrators-repository");
const delivery_address_does_not_exist_error_1 = require("./errors/delivery-address-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("./errors/recipient-does-not-exist-error");
const orders_repository_1 = require("../repositories/orders-repository");
const delivery_address_repository_1 = require("../repositories/delivery-address-repository");
const recipients_repository_1 = require("../repositories/recipients-repository");
const order_1 = require("../../enterprise/entities/order");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
const common_1 = require("@nestjs/common");
let RegisterOrderForRecipientUseCase = class RegisterOrderForRecipientUseCase {
    constructor(ordersRepository, administratorsRepository, deliveryAddressRepository, recipientsRepository) {
        this.ordersRepository = ordersRepository;
        this.administratorsRepository = administratorsRepository;
        this.deliveryAddressRepository = deliveryAddressRepository;
        this.recipientsRepository = recipientsRepository;
    }
    async execute({ administratorId, recipientId, deliveryAddressId, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const recipient = await this.recipientsRepository.findById(recipientId);
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        const deliveryAddress = await this.deliveryAddressRepository.findById(deliveryAddressId);
        if (!deliveryAddress) {
            return (0, either_1.left)(new delivery_address_does_not_exist_error_1.DeliveryAddressDoesNotExistError());
        }
        const order = order_1.Order.create({
            status: order_status_enum_1.ORDER_STATUS.PENDING,
            recipientId: recipient.id,
            deliveryAddressId: deliveryAddress.id,
        });
        await this.ordersRepository.create(order);
        return (0, either_1.right)({});
    }
};
exports.RegisterOrderForRecipientUseCase = RegisterOrderForRecipientUseCase;
exports.RegisterOrderForRecipientUseCase = RegisterOrderForRecipientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        administrators_repository_1.AdministratorsRepository,
        delivery_address_repository_1.DeliveryAddressRepository,
        recipients_repository_1.RecipientsRepository])
], RegisterOrderForRecipientUseCase);
//# sourceMappingURL=register-order-for-recipient-use-case.js.map