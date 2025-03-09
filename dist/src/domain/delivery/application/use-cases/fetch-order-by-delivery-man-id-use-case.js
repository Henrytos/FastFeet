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
exports.FetchOrderByDeliveryManIdUseCase = void 0;
const either_1 = require("../../../../core/either");
const orders_repository_1 = require("../repositories/orders-repository");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const common_1 = require("@nestjs/common");
let FetchOrderByDeliveryManIdUseCase = class FetchOrderByDeliveryManIdUseCase {
    constructor(ordersRepository, deliveryMansRepository) {
        this.ordersRepository = ordersRepository;
        this.deliveryMansRepository = deliveryMansRepository;
    }
    async execute({ deliveryManId, page, perPage, }) {
        const deliveryman = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryman) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const orders = await this.ordersRepository.fetchOrderByDeliveryManId({
            deliveryManId,
            page,
            perPage,
        });
        return (0, either_1.right)({ orders });
    }
};
exports.FetchOrderByDeliveryManIdUseCase = FetchOrderByDeliveryManIdUseCase;
exports.FetchOrderByDeliveryManIdUseCase = FetchOrderByDeliveryManIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        delivery_mans_repository_1.DeliveryMansRepository])
], FetchOrderByDeliveryManIdUseCase);
//# sourceMappingURL=fetch-order-by-delivery-man-id-use-case.js.map