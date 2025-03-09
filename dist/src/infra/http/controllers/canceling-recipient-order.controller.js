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
exports.CancelingRecipientOrderController = void 0;
const canceling_recipient_order_use_case_1 = require("../../../domain/delivery/application/use-cases/canceling-recipient-order-use-case");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const delivery_man_does_not_exist_message_dto_1 = require("../dtos/delivery-man-does-not-exist-message.dto");
const order_does_not_exists_message_dto_1 = require("../dtos/order-does-not-exists-message.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const routeParamCancelingOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid(),
});
let CancelingRecipientOrderController = class CancelingRecipientOrderController {
    constructor(cancelingRecipientOrderUseCase) {
        this.cancelingRecipientOrderUseCase = cancelingRecipientOrderUseCase;
    }
    async handler({ orderId }, deliveryMan) {
        const result = await this.cancelingRecipientOrderUseCase.execute({
            deliveryManId: deliveryMan.sub,
            orderId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            message: 'Order canceled successfully',
        };
    }
};
exports.CancelingRecipientOrderController = CancelingRecipientOrderController;
__decorate([
    (0, common_1.Patch)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('DELIVERY_MAN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Order canceled successfully' },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: delivery_man_does_not_exist_message_dto_1.DeliveryManDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: order_does_not_exists_message_dto_1.OrderDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamCancelingOrderSchema))),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CancelingRecipientOrderController.prototype, "handler", null);
exports.CancelingRecipientOrderController = CancelingRecipientOrderController = __decorate([
    (0, common_1.Controller)('/orders/:orderId/canceling'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('order'),
    __metadata("design:paramtypes", [canceling_recipient_order_use_case_1.CancelingRecipientOrderUseCase])
], CancelingRecipientOrderController);
//# sourceMappingURL=canceling-recipient-order.controller.js.map