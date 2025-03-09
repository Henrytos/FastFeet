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
exports.RecipientDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecipientDTO {
}
exports.RecipientDTO = RecipientDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID of the recipient',
        format: 'uuid',
        required: true,
    }),
    __metadata("design:type", String)
], RecipientDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'John Doe',
        description: 'Name of the recipient',
        required: true,
    }),
    __metadata("design:type", String)
], RecipientDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'johndoe@example.com',
        description: 'Email of the recipient',
        format: 'email',
        required: true,
    }),
    __metadata("design:type", String)
], RecipientDTO.prototype, "email", void 0);
//# sourceMappingURL=recipient.dto.js.map