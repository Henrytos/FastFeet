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
exports.GetOrderByIdUseCase = void 0;
const either_1 = require("../../../../core/either");
const order_does_not_exist_error_1 = require("./errors/order-does-not-exist-error");
const orders_repository_1 = require("../repositories/orders-repository");
const common_1 = require("@nestjs/common");
let GetOrderByIdUseCase = class GetOrderByIdUseCase {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async execute({ orderId, }) {
        const orderWithDetails = await this.ordersRepository.findByIdWithDetails(orderId);
        if (!orderWithDetails) {
            return (0, either_1.left)(new order_does_not_exist_error_1.OrderDoesNotExistError());
        }
        return (0, either_1.right)({
            orderWithDetails,
        });
    }
};
exports.GetOrderByIdUseCase = GetOrderByIdUseCase;
exports.GetOrderByIdUseCase = GetOrderByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository])
], GetOrderByIdUseCase);
//# sourceMappingURL=get-order-by-id-use-case.js.map