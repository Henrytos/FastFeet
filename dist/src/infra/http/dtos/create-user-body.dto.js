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
exports.CreateUserBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserBodyDTO {
}
exports.CreateUserBodyDTO = CreateUserBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'jhon',
        description: 'name of the user',
    }),
    __metadata("design:type", String)
], CreateUserBodyDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '123.456.789-00',
        description: 'cpf of the user',
    }),
    __metadata("design:type", String)
], CreateUserBodyDTO.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: ' 123456',
        description: 'password of the user',
    }),
    __metadata("design:type", String)
], CreateUserBodyDTO.prototype, "password", void 0);
//# sourceMappingURL=create-user-body.dto.js.map