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
exports.OrderBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderBodyDTO {
}
exports.OrderBodyDTO = OrderBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
        description: 'id of the order',
        required: true,
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
        description: 'id of the delivery man',
        format: 'uuid',
        required: false,
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "deliveryManId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
        description: 'id of the recipient',
        format: 'uuid',
        required: false,
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "recipientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
        description: 'id of the delivery address',
        format: 'uuid',
        required: false,
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "deliveryAddressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '4984c101-82f5-49d3-bc33-a8bc0d1eba60',
        description: 'id of the photo',
        format: 'uuid',
        required: false,
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "photoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        enum: ['pending', 'withdrawn', 'delivered', 'canceled'],
        example: 'pending',
        description: 'status of the order',
    }),
    __metadata("design:type", String)
], OrderBodyDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T10:00:00.000Z',
        description: 'delivery at of the order',
        format: 'date-time',
        required: false,
    }),
    __metadata("design:type", Date)
], OrderBodyDTO.prototype, "deliveryAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T10:00:00.000Z',
        description: 'withdrawn at of the order',
        format: 'date-time',
        required: false,
    }),
    __metadata("design:type", Date)
], OrderBodyDTO.prototype, "withdrawnAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T10:00:00.000Z',
        description: 'updated at of the order',
        format: 'date-time',
        required: false,
    }),
    __metadata("design:type", Date)
], OrderBodyDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T10:00:00.000Z',
        description: 'created at of the order',
        format: 'date-time',
        required: true,
    }),
    __metadata("design:type", Date)
], OrderBodyDTO.prototype, "createdAt", void 0);
//# sourceMappingURL=order-body.dto.js.map