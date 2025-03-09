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
exports.GetDeliveryManByIdUseCase = void 0;
const either_1 = require("../../../../core/either");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const delivery_man_does_not_exist_error_1 = require("./errors/delivery-man-does-not-exist-error");
const common_1 = require("@nestjs/common");
let GetDeliveryManByIdUseCase = class GetDeliveryManByIdUseCase {
    constructor(deliveryMansRepository) {
        this.deliveryMansRepository = deliveryMansRepository;
    }
    async execute({ deliveryManId, }) {
        const deliveryMan = await this.deliveryMansRepository.findById(deliveryManId);
        if (!deliveryMan) {
            return (0, either_1.left)(new delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError());
        }
        return (0, either_1.right)({ deliveryMan });
    }
};
exports.GetDeliveryManByIdUseCase = GetDeliveryManByIdUseCase;
exports.GetDeliveryManByIdUseCase = GetDeliveryManByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_mans_repository_1.DeliveryMansRepository])
], GetDeliveryManByIdUseCase);
//# sourceMappingURL=get-delivery-man-by-id-use-case.js.map