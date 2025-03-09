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
exports.RegisterDeliveryAddressUseCase = void 0;
const either_1 = require("../../../../core/either");
const administrators_repository_1 = require("../repositories/administrators-repository");
const delivery_address_repository_1 = require("../repositories/delivery-address-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const delivery_address_1 = require("../../enterprise/entities/delivery-address");
const common_1 = require("@nestjs/common");
let RegisterDeliveryAddressUseCase = class RegisterDeliveryAddressUseCase {
    constructor(administratorsRepository, deliveryAddressRepository) {
        this.administratorsRepository = administratorsRepository;
        this.deliveryAddressRepository = deliveryAddressRepository;
    }
    async execute({ administratorId, state, city, neighborhood, street, zip, number, latitude, longitude, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const deliveryAddress = delivery_address_1.DeliveryAddress.create({
            state,
            city,
            neighborhood,
            street,
            zip,
            number,
            latitude,
            longitude,
        });
        await this.deliveryAddressRepository.create(deliveryAddress);
        return (0, either_1.right)({ deliveryAddress });
    }
};
exports.RegisterDeliveryAddressUseCase = RegisterDeliveryAddressUseCase;
exports.RegisterDeliveryAddressUseCase = RegisterDeliveryAddressUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrators_repository_1.AdministratorsRepository,
        delivery_address_repository_1.DeliveryAddressRepository])
], RegisterDeliveryAddressUseCase);
//# sourceMappingURL=register-delivery-address-use-case.js.map