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
exports.CreateAccountController = void 0;
const administrator_registration_use_case_1 = require("../../../domain/delivery/application/use-cases/administrator-registration-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const wrong_credentials_error_1 = require("../../../domain/delivery/application/use-cases/errors/wrong-credentials-error");
const register_delivery_man_use_case_1 = require("../../../domain/delivery/application/use-cases/register-delivery-man-use-case");
const current_user_1 = require("../../auth/current-user");
const swagger_1 = require("@nestjs/swagger");
const create_user_body_dto_1 = require("../dtos/create-user-body.dto");
const wrong_credential_error_message_dto_1 = require("../dtos/wrong-credential-error-message.dto");
const administrator_created_response_dto_1 = require("../dtos/administrator-created-response.dto");
const delivery_man_created_response_dto_1 = require("../dtos/delivery-man-created-response.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const createUserBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    cpf: zod_1.z.string(),
    password: zod_1.z.string(),
});
let CreateAccountController = class CreateAccountController {
    constructor(administratorRegistrationUseCase, registerDeliveryManUseCase) {
        this.administratorRegistrationUseCase = administratorRegistrationUseCase;
        this.registerDeliveryManUseCase = registerDeliveryManUseCase;
    }
    async handlerCreateAdmin(body) {
        const { name, cpf, password } = body;
        const result = await this.administratorRegistrationUseCase.execute({
            name,
            cpf,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            message: 'administrator created successfully',
        };
    }
    async handlerCreateUser(body, currentUser) {
        const { name, cpf, password } = body;
        const result = await this.registerDeliveryManUseCase.execute({
            name,
            cpf,
            password,
            administratorId: currentUser.sub,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.ConflictException(result.value.message);
                default:
                    throw new common_1.BadRequestException(result.value.message);
            }
        }
        return {
            message: 'delivery man created successfully',
        };
    }
};
exports.CreateAccountController = CreateAccountController;
__decorate([
    (0, common_1.Post)('/administrator'),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiBody)({ type: create_user_body_dto_1.CreateUserBodyDTO }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Administrator created successfully',
        type: administrator_created_response_dto_1.AdministratorCreatedResponseDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: wrong_credential_error_message_dto_1.WrongCredentialMessageDTO,
        description: 'Administrator already exists',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(createUserBodySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateAccountController.prototype, "handlerCreateAdmin", null);
__decorate([
    (0, common_1.Post)('/delivery-man'),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiBody)({ type: create_user_body_dto_1.CreateUserBodyDTO }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Delivery man created successfully',
        type: delivery_man_created_response_dto_1.DeliveryManCreatedResponseDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: wrong_credential_error_message_dto_1.WrongCredentialMessageDTO,
        description: 'Administrator already exists',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(createUserBodySchema))),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateAccountController.prototype, "handlerCreateUser", null);
exports.CreateAccountController = CreateAccountController = __decorate([
    (0, swagger_1.ApiTags)('sing up'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/accounts'),
    __metadata("design:paramtypes", [administrator_registration_use_case_1.AdministratorRegistrationUseCase,
        register_delivery_man_use_case_1.RegisterDeliveryManUseCase])
], CreateAccountController);
//# sourceMappingURL=create-account.controller.js.map