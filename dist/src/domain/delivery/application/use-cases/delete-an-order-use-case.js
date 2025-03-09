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
exports.DeleteAnOrderUseCase = void 0;
const either_1 = require("../../../../core/either");
const order_does_not_exist_error_1 = require("./errors/order-does-not-exist-error");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const orders_repository_1 = require("../repositories/orders-repository");
const administrators_repository_1 = require("../repositories/administrators-repository");
const common_1 = require("@nestjs/common");
let DeleteAnOrderUseCase = class DeleteAnOrderUseCase {
    constructor(ordersRepository, administratorsRepository) {
        this.ordersRepository = ordersRepository;
        this.administratorsRepository = administratorsRepository;
    }
    async execute({ orderId, administratorId, }) {
        const order = await this.ordersRepository.findById(orderId);
        if (!order) {
            return (0, either_1.left)(new order_does_not_exist_error_1.OrderDoesNotExistError());
        }
        const administratorDoesNotExist = !(await this.administratorsRepository.findById(administratorId));
        if (administratorDoesNotExist) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        await this.ordersRepository.delete(order);
        return (0, either_1.right)({});
    }
};
exports.DeleteAnOrderUseCase = DeleteAnOrderUseCase;
exports.DeleteAnOrderUseCase = DeleteAnOrderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        administrators_repository_1.AdministratorsRepository])
], DeleteAnOrderUseCase);
//# sourceMappingURL=delete-an-order-use-case.js.map