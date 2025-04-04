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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDeliveryManPasswordController = void 0;
const change_delivery_man_password_use_case_1 = require("../../../domain/delivery/application/use-cases/change-delivery-man-password-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const delivery_man_does_not_exist_message_dto_1 = require("../dtos/delivery-man-does-not-exist-message.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const validationPasswordSchema = zod_1.z.string().min(6).max(20);
let ChangeDeliveryManPasswordController = class ChangeDeliveryManPasswordController {
    constructor(changeDeliveryManPasswordUseCase) {
        this.changeDeliveryManPasswordUseCase = changeDeliveryManPasswordUseCase;
    }
    async handler(user, deliveryManCpf, password) {
        const result = await this.changeDeliveryManPasswordUseCase.execute({
            administratorId: user.sub,
            cpf: deliveryManCpf,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            message: 'password changed successfully',
        };
    }
};
exports.ChangeDeliveryManPasswordController = ChangeDeliveryManPasswordController;
__decorate([
    (0, common_1.Patch)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'deliveryManCpf',
        type: 'string',
        description: 'CPF do entregador',
        required: true,
        schema: {
            type: 'string',
            format: 'cpf',
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'password changed successfully',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: delivery_man_does_not_exist_message_dto_1.DeliveryManDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('deliveryManCpf')),
    __param(2, (0, common_1.Body)('password', new zod_validation_pipe_1.ZodValidationPipe(validationPasswordSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ChangeDeliveryManPasswordController.prototype, "handler", null);
exports.ChangeDeliveryManPasswordController = ChangeDeliveryManPasswordController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-man/:deliveryManCpf/password'),
    __metadata("design:paramtypes", [change_delivery_man_password_use_case_1.ChangeDeliveryManPasswordUseCase])
], ChangeDeliveryManPasswordController);
//# sourceMappingURL=change-delivery-man-password.controller.js.map