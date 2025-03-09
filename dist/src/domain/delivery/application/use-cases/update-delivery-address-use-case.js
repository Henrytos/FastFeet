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
exports.UpdateDeliveryAddressUseCase = void 0;
const either_1 = require("../../../../core/either");
const delivery_address_repository_1 = require("../repositories/delivery-address-repository");
const delivery_address_does_not_exist_error_1 = require("./errors/delivery-address-does-not-exist-error");
const administrators_repository_1 = require("../repositories/administrators-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const common_1 = require("@nestjs/common");
const delivery_address_1 = require("../../enterprise/entities/delivery-address");
let UpdateDeliveryAddressUseCase = class UpdateDeliveryAddressUseCase {
    constructor(administratorsRepository, deliveryAddressRepository) {
        this.administratorsRepository = administratorsRepository;
        this.deliveryAddressRepository = deliveryAddressRepository;
    }
    async execute({ administratorId, deliveryAddressId, state, city, neighborhood, street, zip, number, latitude, longitude, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const deliveryAddress = await this.deliveryAddressRepository.findById(deliveryAddressId);
        if (!deliveryAddress) {
            return (0, either_1.left)(new delivery_address_does_not_exist_error_1.DeliveryAddressDoesNotExistError());
        }
        const deliveryAddressUpdated = delivery_address_1.DeliveryAddress.create({
            state,
            city,
            neighborhood,
            street,
            zip,
            number,
            latitude,
            longitude,
        }, deliveryAddress.id);
        this.deliveryAddressRepository.save(deliveryAddressUpdated);
        return (0, either_1.right)({});
    }
};
exports.UpdateDeliveryAddressUseCase = UpdateDeliveryAddressUseCase;
exports.UpdateDeliveryAddressUseCase = UpdateDeliveryAddressUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrators_repository_1.AdministratorsRepository,
        delivery_address_repository_1.DeliveryAddressRepository])
], UpdateDeliveryAddressUseCase);
//# sourceMappingURL=update-delivery-address-use-case.js.map