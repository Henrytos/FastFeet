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
exports.UpdateDeliveryManByAdministratorUseCase = void 0;
const either_1 = require("../../../../core/either");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const delivery_man_1 = require("../../enterprise/entities/delivery-man");
const hash_generator_1 = require("../cryptography/hash-generator");
const administrators_repository_1 = require("../repositories/administrators-repository");
const cpf_1 = require("../../enterprise/entities/value-object/cpf");
const common_1 = require("@nestjs/common");
let UpdateDeliveryManByAdministratorUseCase = class UpdateDeliveryManByAdministratorUseCase {
    constructor(administratorsRepository, deliveryMansRepository, hashGenerator) {
        this.administratorsRepository = administratorsRepository;
        this.deliveryMansRepository = deliveryMansRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ deliveryManId, administratorId, cpf, name, password, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        const passwordHash = await this.hashGenerator.hash(password);
        const updatedDeliveryMan = delivery_man_1.DeliveryMan.create({
            cpf: cpf_1.Cpf.create(cpf),
            name,
            password: passwordHash,
        }, deliveryMan.id);
        await this.deliveryMansRepository.save(updatedDeliveryMan);
        return (0, either_1.right)({});
    }
};
exports.UpdateDeliveryManByAdministratorUseCase = UpdateDeliveryManByAdministratorUseCase;
exports.UpdateDeliveryManByAdministratorUseCase = UpdateDeliveryManByAdministratorUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrators_repository_1.AdministratorsRepository,
        delivery_mans_repository_1.DeliveryMansRepository,
        hash_generator_1.HashGenerator])
], UpdateDeliveryManByAdministratorUseCase);
//# sourceMappingURL=update-delivery-man-by-administrator.js.map