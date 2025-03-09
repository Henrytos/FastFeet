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
exports.RegisterDeliveryManController = void 0;
const register_delivery_man_use_case_1 = require("../../../domain/delivery/application/use-cases/register-delivery-man-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const wrong_credentials_error_1 = require("../../../domain/delivery/application/use-cases/errors/wrong-credentials-error");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const delivery_man_body_dto_1 = require("../dtos/delivery-man-body.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const registerDeliveryManBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    cpf: zod_1.z.string().length(11),
    password: zod_1.z.string().min(6).max(20),
});
const validationZodPipe = new zod_validation_pipe_1.ZodValidationPipe(registerDeliveryManBodySchema);
let RegisterDeliveryManController = class RegisterDeliveryManController {
    constructor(registerDeliveryManUseCase) {
        this.registerDeliveryManUseCase = registerDeliveryManUseCase;
    }
    async handler(administrator, body) {
        const { name, cpf, password } = body;
        const result = await this.registerDeliveryManUseCase.execute({
            administratorId: administrator.sub,
            name,
            cpf,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
    }
};
exports.RegisterDeliveryManController = RegisterDeliveryManController;
__decorate([
    (0, common_1.Post)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiBody)({
        type: delivery_man_body_dto_1.DeliveryManBodyDTO,
    }),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
        description: 'Unauthorized access',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request',
        schema: {
            type: 'object',
            properties: {
                message: {
                    example: 'Wrong credentials [cpf]',
                },
            },
        },
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, current_user_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(validationZodPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RegisterDeliveryManController.prototype, "handler", null);
exports.RegisterDeliveryManController = RegisterDeliveryManController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-man'),
    __metadata("design:paramtypes", [register_delivery_man_use_case_1.RegisterDeliveryManUseCase])
], RegisterDeliveryManController);
//# sourceMappingURL=register-delivery-man.controller.js.map