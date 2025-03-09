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
exports.DeleteDeliveryManController = void 0;
const delete_delivery_man_by_id_use_case_1 = require("../../../domain/delivery/application/use-cases/delete-delivery-man-by-id-use-case");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const wrong_credentials_error_1 = require("../../../domain/delivery/application/use-cases/errors/wrong-credentials-error");
const current_user_1 = require("../../auth/current-user");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delivery_man_does_not_exist_message_dto_1 = require("../dtos/delivery-man-does-not-exist-message.dto");
const wrong_credential_error_message_dto_1 = require("../dtos/wrong-credential-error-message.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
let DeleteDeliveryManController = class DeleteDeliveryManController {
    constructor(deleteDeliveryManUseCase) {
        this.deleteDeliveryManUseCase = deleteDeliveryManUseCase;
    }
    async handler(user, deliveryManId) {
        const result = await this.deleteDeliveryManUseCase.execute({
            administratorId: user.sub,
            deliveryManId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
    }
};
exports.DeleteDeliveryManController = DeleteDeliveryManController;
__decorate([
    (0, common_1.Delete)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiParam)({
        name: 'deliveryManId',
        type: 'uuid',
        description: 'The delivery man identifier',
        required: true,
        schema: {
            type: 'string',
            format: 'uuid',
        },
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Delivery man deleted',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: delivery_man_does_not_exist_message_dto_1.DeliveryManDoesNotExistMessageDTO,
        description: 'Delivery man does not exist',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        type: wrong_credential_error_message_dto_1.WrongCredentialMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('deliveryManId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeleteDeliveryManController.prototype, "handler", null);
exports.DeleteDeliveryManController = DeleteDeliveryManController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-man/:deliveryManId'),
    __metadata("design:paramtypes", [delete_delivery_man_by_id_use_case_1.DeleteDeliveryManByIdUseCase])
], DeleteDeliveryManController);
//# sourceMappingURL=delete-delivery-man.controller.js.map