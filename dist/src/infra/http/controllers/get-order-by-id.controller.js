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
exports.GetORderByIdController = void 0;
const get_order_by_id_use_case_1 = require("../../../domain/delivery/application/use-cases/get-order-by-id-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const order_body_dto_1 = require("../dtos/order-body.dto");
const order_does_not_exists_message_dto_1 = require("../dtos/order-does-not-exists-message.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const order_with_details_presenter_1 = require("../presenters/order-with-details-presenter");
const routeParamsGetOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid(),
});
let GetORderByIdController = class GetORderByIdController {
    constructor(getOrderByIdUseCase) {
        this.getOrderByIdUseCase = getOrderByIdUseCase;
    }
    async handler({ orderId }) {
        const result = await this.getOrderByIdUseCase.execute({ orderId });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            orderWithDetails: order_with_details_presenter_1.OrderWithDetailsPresenter.toHTTP(result.value.orderWithDetails),
        };
    }
};
exports.GetORderByIdController = GetORderByIdController;
__decorate([
    (0, common_1.Get)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR', 'DELIVERY_MAN'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'orderId',
        type: 'string',
        required: true,
        format: 'uuid',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: order_body_dto_1.OrderBodyDTO,
        description: 'Order details',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: order_does_not_exists_message_dto_1.OrderDoesNotExistMessageDTO,
        description: 'Order not found',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsGetOrderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetORderByIdController.prototype, "handler", null);
exports.GetORderByIdController = GetORderByIdController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/orders/:orderId'),
    __metadata("design:paramtypes", [get_order_by_id_use_case_1.GetOrderByIdUseCase])
], GetORderByIdController);
//# sourceMappingURL=get-order-by-id.controller.js.map