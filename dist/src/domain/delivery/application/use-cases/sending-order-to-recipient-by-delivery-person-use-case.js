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
exports.SendingOrderToRecipientByDeliveryManUseCase = void 0;
const either_1 = require("../../../../core/either");
const delivery_address_does_not_exist_error_1 = require("./errors/delivery-address-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("./errors/recipient-does-not-exist-error");
const orders_repository_1 = require("../repositories/orders-repository");
const delivery_address_repository_1 = require("../repositories/delivery-address-repository");
const recipients_repository_1 = require("../repositories/recipients-repository");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const order_does_not_exist_error_1 = require("./errors/order-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
const common_1 = require("@nestjs/common");
let SendingOrderToRecipientByDeliveryManUseCase = class SendingOrderToRecipientByDeliveryManUseCase {
    constructor(ordersRepository, deliveryMansRepository, deliveryAddressRepository, recipientsRepository) {
        this.ordersRepository = ordersRepository;
        this.deliveryMansRepository = deliveryMansRepository;
        this.deliveryAddressRepository = deliveryAddressRepository;
        this.recipientsRepository = recipientsRepository;
    }
    async execute({ deliveryManId, orderId, }) {
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const order = await this.ordersRepository.findById(orderId);
        if (!order) {
            return (0, either_1.left)(new order_does_not_exist_error_1.OrderDoesNotExistError());
        }
        const recipient = await this.recipientsRepository.findById(order.recipientId.toString());
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        const deliveryAddress = await this.deliveryAddressRepository.findById(order.deliveryAddressId.toString());
        if (!deliveryAddress) {
            return (0, either_1.left)(new delivery_address_does_not_exist_error_1.DeliveryAddressDoesNotExistError());
        }
        order.status = order_status_enum_1.ORDER_STATUS.WITHDRAWN;
        order.deliveryManId = deliveryMan.id;
        order.deliveryAddressId = deliveryAddress.id;
        this.ordersRepository.save(order);
        return (0, either_1.right)({});
    }
};
exports.SendingOrderToRecipientByDeliveryManUseCase = SendingOrderToRecipientByDeliveryManUseCase;
exports.SendingOrderToRecipientByDeliveryManUseCase = SendingOrderToRecipientByDeliveryManUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        delivery_mans_repository_1.DeliveryMansRepository,
        delivery_address_repository_1.DeliveryAddressRepository,
        recipients_repository_1.RecipientsRepository])
], SendingOrderToRecipientByDeliveryManUseCase);
//# sourceMappingURL=sending-order-to-recipient-by-delivery-person-use-case.js.map