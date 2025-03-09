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
exports.DeliveryAddressBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeliveryAddressBodyDTO {
}
exports.DeliveryAddressBodyDTO = DeliveryAddressBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'SP',
        description: 'State',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'São Paulo',
        description: 'City',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Vila Mariana',
        description: 'Neighborhood',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Rua dos Bandeirantes',
        description: 'Street',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '01555-000',
        description: 'Zip Code',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "zip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '23-A',
        description: 'Number',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '-22.911604',
        description: 'Latitude',
        format: 'number',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '-47.060223',
        description: 'Longitude',
        format: 'number',
        required: true,
    }),
    __metadata("design:type", String)
], DeliveryAddressBodyDTO.prototype, "longitude", void 0);
//# sourceMappingURL=delivery-address-body.dto.js.map