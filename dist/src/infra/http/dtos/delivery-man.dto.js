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
exports.DeliveryManDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeliveryManDTO {
}
exports.DeliveryManDTO = DeliveryManDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'deliveryManId',
        example: 'd36f146f-c769-46cb-bb97-098709af6251',
        type: 'string',
        format: 'uuid',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryManDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'cpf',
        example: '123.456.789-00',
        type: 'string',
        format: 'cpf',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryManDTO.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        example: 'John Doe',
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryManDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'role',
        example: 'DELIVERY_MAN',
        default: 'DELIVERY_MAN ',
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryManDTO.prototype, "role", void 0);
//# sourceMappingURL=delivery-man.dto.js.map