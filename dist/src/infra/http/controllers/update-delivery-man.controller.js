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
exports.UpdateDeliveryManController = void 0;
const update_delivery_man_by_administrator_1 = require("../../../domain/delivery/application/use-cases/update-delivery-man-by-administrator");
const current_user_1 = require("../../auth/current-user");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const delivery_man_does_not_exist_message_dto_1 = require("../dtos/delivery-man-does-not-exist-message.dto");
const delivery_man_body_dto_1 = require("../dtos/delivery-man-body.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const updateDeliveryManBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    password: zod_1.z.string().min(6).max(20),
    cpf: zod_1.z.string().length(11),
});
let UpdateDeliveryManController = class UpdateDeliveryManController {
    constructor(updateDeliveryManByAdministratorUseCase) {
        this.updateDeliveryManByAdministratorUseCase = updateDeliveryManByAdministratorUseCase;
    }
    async handler(user, deliveryManId, body) {
        const { name, password, cpf } = body;
        const result = await this.updateDeliveryManByAdministratorUseCase.execute({
            administratorId: user.sub,
            deliveryManId,
            cpf,
            name,
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
            message: 'Delivery man updated successfully',
        };
    }
};
exports.UpdateDeliveryManController = UpdateDeliveryManController;
__decorate([
    (0, common_1.Put)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'deliveryManId',
        type: 'string',
        required: true,
        format: 'uuid',
    }),
    (0, swagger_1.ApiBody)({
        type: delivery_man_body_dto_1.DeliveryManBodyDTO,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update delivery man data',
        schema: {
            example: {
                message: 'Delivery man updated successfully',
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
        description: 'Administrator does not exist',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: delivery_man_does_not_exist_message_dto_1.DeliveryManDoesNotExistMessageDTO,
        description: 'Delivery man does not exist',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('deliveryManId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(updateDeliveryManBodySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UpdateDeliveryManController.prototype, "handler", null);
exports.UpdateDeliveryManController = UpdateDeliveryManController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-mans/:deliveryManId'),
    __metadata("design:paramtypes", [update_delivery_man_by_administrator_1.UpdateDeliveryManByAdministratorUseCase])
], UpdateDeliveryManController);
//# sourceMappingURL=update-delivery-man.controller.js.map