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
exports.AuthenticateController = void 0;
const public_1 = require("../../auth/public");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const authenticate_user_use_case_1 = require("../../../domain/delivery/application/use-cases/authenticate-user-use-case");
const swagger_1 = require("@nestjs/swagger");
const authenticate_body_dto_1 = require("../dtos/authenticate-body.dto");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const access_token_response_dto_1 = require("../dtos/access-token-response.dto");
const wrong_credentials_error_1 = require("../../../domain/delivery/application/use-cases/errors/wrong-credentials-error");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const wrong_credential_error_message_dto_1 = require("../dtos/wrong-credential-error-message.dto");
const authenticateBodySchema = zod_1.z.object({
    cpf: zod_1.z.string(),
    password: zod_1.z.string().min(6).max(20),
});
let AuthenticateController = class AuthenticateController {
    constructor(authenticateUserUseCase) {
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    async handler(body) {
        const { cpf, password } = body;
        const result = await this.authenticateUserUseCase.execute({
            cpf,
            password,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            accessToken: result.value.accessToken,
        };
    }
};
exports.AuthenticateController = AuthenticateController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        type: authenticate_body_dto_1.AuthenticateBodyDto,
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Authenticated',
        type: access_token_response_dto_1.AccessTokenResponseDTO,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: wrong_credential_error_message_dto_1.WrongCredentialMessageDTO,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(authenticateBodySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticateController.prototype, "handler", null);
exports.AuthenticateController = AuthenticateController = __decorate([
    (0, public_1.Public)(),
    (0, swagger_1.ApiTags)('sing in'),
    (0, common_1.Controller)('/sessions'),
    __metadata("design:paramtypes", [authenticate_user_use_case_1.AuthenticateUserUseCase])
], AuthenticateController);
//# sourceMappingURL=authenticate.controller.js.map