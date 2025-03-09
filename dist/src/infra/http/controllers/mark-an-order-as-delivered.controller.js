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
exports.MarkAnOrderAsDeliveredController = void 0;
const mark_an_order_as_delivered_use_case_1 = require("../../../domain/delivery/application/use-cases/mark-an-order-as-delivered-use-case");
const common_1 = require("@nestjs/common");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const photo_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/photo-does-not-exist-error");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const routeParamsMarkAnOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid(),
});
const bodyMarkAnOrderSchema = zod_1.z.object({
    photoId: zod_1.z.string().uuid(),
});
let MarkAnOrderAsDeliveredController = class MarkAnOrderAsDeliveredController {
    constructor(markAnOrderAsDeliveredUseCase) {
        this.markAnOrderAsDeliveredUseCase = markAnOrderAsDeliveredUseCase;
    }
    async handler({ orderId }, { photoId }, { sub: deliveryManId }) {
        const result = await this.markAnOrderAsDeliveredUseCase.execute({
            orderId,
            deliveryManId,
            photoId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case photo_does_not_exist_error_1.PhotoDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            message: 'Order marked as delivered successfully',
        };
    }
};
exports.MarkAnOrderAsDeliveredController = MarkAnOrderAsDeliveredController;
__decorate([
    (0, common_1.Patch)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('DELIVERY_MAN'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Order marked as delivered successfully',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Order does not exist',
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'DeliveryMan does not exist',
                },
            },
        },
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsMarkAnOrderSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bodyMarkAnOrderSchema))),
    __param(2, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MarkAnOrderAsDeliveredController.prototype, "handler", null);
exports.MarkAnOrderAsDeliveredController = MarkAnOrderAsDeliveredController = __decorate([
    (0, common_1.Controller)('/orders/:orderId/delivered'),
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [mark_an_order_as_delivered_use_case_1.MarkAnOrderAsDeliveredUseCase])
], MarkAnOrderAsDeliveredController);
//# sourceMappingURL=mark-an-order-as-delivered.controller.js.map