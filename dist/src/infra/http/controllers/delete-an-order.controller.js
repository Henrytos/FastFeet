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
exports.DeleteAnOrderController = void 0;
const delete_an_order_use_case_1 = require("../../../domain/delivery/application/use-cases/delete-an-order-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const swagger_1 = require("@nestjs/swagger");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const order_does_not_exists_message_dto_1 = require("../dtos/order-does-not-exists-message.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const routeParamsDeleteAnOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
});
let DeleteAnOrderController = class DeleteAnOrderController {
    constructor(deleteAnOrderUseCase) {
        this.deleteAnOrderUseCase = deleteAnOrderUseCase;
    }
    async handler({ orderId }, administrator) {
        const result = await this.deleteAnOrderUseCase.execute({
            orderId,
            administratorId: administrator.sub,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException('An error occurred');
            }
        }
    }
};
exports.DeleteAnOrderController = DeleteAnOrderController;
__decorate([
    (0, common_1.Delete)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: 'orderId',
        type: 'uuid',
        description: 'The ID of the order to be deleted',
        required: true,
        schema: {
            type: 'string',
            format: 'uuid',
        },
    }),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid order ID',
        type: order_does_not_exists_message_dto_1.OrderDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsDeleteAnOrderSchema))),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeleteAnOrderController.prototype, "handler", null);
exports.DeleteAnOrderController = DeleteAnOrderController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/orders/:orderId'),
    __metadata("design:paramtypes", [delete_an_order_use_case_1.DeleteAnOrderUseCase])
], DeleteAnOrderController);
//# sourceMappingURL=delete-an-order.controller.js.map