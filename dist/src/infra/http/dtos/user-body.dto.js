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
exports.UserBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserBodyDTO {
}
exports.UserBodyDTO = UserBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'id of the user',
        required: true,
        format: 'uuid',
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'John Doe',
        description: 'name of the user',
        required: true,
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '123.456.789-00',
        description: 'cpf of the user',
        required: true,
        pattern: '/^(d{3}.d{3}.d{3}-d{2})$/',
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'ADMINISTRATOR',
        description: 'role of the user',
        required: true,
        enum: ['ADMINISTRATOR', 'DELIVERY_MAN'],
        default: 'ADMINISTRATOR',
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T12:00:00.000Z',
        description: 'date and time of creation',
        required: true,
        format: 'date-time',
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2022-01-01T12:00:00.000Z',
        description: 'date and time of last update',
        required: false,
        format: 'date-time',
    }),
    __metadata("design:type", String)
], UserBodyDTO.prototype, "updatedAt", void 0);
//# sourceMappingURL=user-body.dto.js.map