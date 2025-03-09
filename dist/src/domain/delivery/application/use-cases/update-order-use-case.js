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
exports.UpdateOrderUseCase = void 0;
const either_1 = require("../../../../core/either");
const order_does_not_exist_error_1 = require("./errors/order-does-not-exist-error");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const order_1 = require("../../enterprise/entities/order");
const common_1 = require("@nestjs/common");
const administrators_repository_1 = require("../repositories/administrators-repository");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const orders_repository_1 = require("../repositories/orders-repository");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
let UpdateOrderUseCase = class UpdateOrderUseCase {
    constructor(ordersRepository, administratorsRepository, deliveryMansRepository) {
        this.ordersRepository = ordersRepository;
        this.administratorsRepository = administratorsRepository;
        this.deliveryMansRepository = deliveryMansRepository;
    }
    async execute({ orderId, administratorId, deliveryManId, status, deliveryAt, withdrawnAt, }) {
        const order = await this.ordersRepository.findById(orderId);
        if (!order) {
            return (0, either_1.left)(new order_does_not_exist_error_1.OrderDoesNotExistError());
        }
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const updatedOrder = order_1.Order.create({
            status,
            deliveryAddressId: order.deliveryAddressId,
            deliveryManId: new unique_entity_id_1.UniqueEntityID(deliveryManId),
            recipientId: order.recipientId,
            photoId: order.photoId,
            withdrawnAt,
            deliveryAt,
        }, order.id);
        await this.ordersRepository.save(updatedOrder);
        return (0, either_1.right)({ order: updatedOrder });
    }
};
exports.UpdateOrderUseCase = UpdateOrderUseCase;
exports.UpdateOrderUseCase = UpdateOrderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        administrators_repository_1.AdministratorsRepository,
        delivery_mans_repository_1.DeliveryMansRepository])
], UpdateOrderUseCase);
//# sourceMappingURL=update-order-use-case.js.map