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
exports.MarkAnOrderAsDeliveredUseCase = void 0;
const either_1 = require("../../../../core/either");
const orders_repository_1 = require("../repositories/orders-repository");
const order_does_not_exist_error_1 = require("./errors/order-does-not-exist-error");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
const photos_repository_1 = require("../repositories/photos-repository");
const photo_does_not_exist_error_1 = require("./errors/photo-does-not-exist-error");
const order_status_enum_1 = require("../../../../core/constants/order-status.enum");
const common_1 = require("@nestjs/common");
let MarkAnOrderAsDeliveredUseCase = class MarkAnOrderAsDeliveredUseCase {
    constructor(ordersRepository, deliveryMansRepository, photosRepository) {
        this.ordersRepository = ordersRepository;
        this.deliveryMansRepository = deliveryMansRepository;
        this.photosRepository = photosRepository;
    }
    async execute({ orderId, deliveryManId, photoId, }) {
        const order = await this.ordersRepository.findById(orderId);
        if (!order) {
            return (0, either_1.left)(new order_does_not_exist_error_1.OrderDoesNotExistError());
        }
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const isDeliveryManAllowed = !order.deliveryManId.equals(deliveryMan.id);
        if (isDeliveryManAllowed) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        if (!order.isValidForDelivered()) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const photo = await this.photosRepository.findById(photoId);
        if (!photo) {
            return (0, either_1.left)(new photo_does_not_exist_error_1.PhotoDoesNotExistError());
        }
        order.status = order_status_enum_1.ORDER_STATUS.DELIVERED;
        order.photoId = photo.id;
        await this.ordersRepository.save(order);
        return (0, either_1.right)({});
    }
};
exports.MarkAnOrderAsDeliveredUseCase = MarkAnOrderAsDeliveredUseCase;
exports.MarkAnOrderAsDeliveredUseCase = MarkAnOrderAsDeliveredUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        delivery_mans_repository_1.DeliveryMansRepository,
        photos_repository_1.PhotosRepository])
], MarkAnOrderAsDeliveredUseCase);
//# sourceMappingURL=mark-an-order-as-delivered-use-case.js.map