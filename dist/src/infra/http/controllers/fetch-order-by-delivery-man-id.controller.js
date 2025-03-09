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
exports.FetchOrderByDeliveryManIdController = void 0;
const common_1 = require("@nestjs/common");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const fetch_order_by_delivery_man_id_use_case_1 = require("../../../domain/delivery/application/use-cases/fetch-order-by-delivery-man-id-use-case");
const order_presenter_1 = require("../presenters/order-presenter");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const fetch_schema_dto_1 = require("../dtos/fetch-schema.dto");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const client_1 = require("@prisma/client");
const queryParamsSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).optional().default(1),
    perPage: zod_1.z.coerce.number().min(1).optional().default(10),
});
const routeParamsSchema = zod_1.z.object({
    deliveryManId: zod_1.z.string().uuid(),
});
let FetchOrderByDeliveryManIdController = class FetchOrderByDeliveryManIdController {
    constructor(fetchOrderByDeliveryManIdUseCase) {
        this.fetchOrderByDeliveryManIdUseCase = fetchOrderByDeliveryManIdUseCase;
    }
    async handler({ page, perPage }, { deliveryManId }) {
        const result = await this.fetchOrderByDeliveryManIdUseCase.execute({
            page,
            perPage,
            deliveryManId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            user: result.value.orders.map(order_presenter_1.OrderPresenter.toHTTP),
        };
    }
};
exports.FetchOrderByDeliveryManIdController = FetchOrderByDeliveryManIdController;
__decorate([
    (0, common_1.Get)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR', 'DELIVERY_MAN'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiQuery)({
        type: fetch_schema_dto_1.FetchSchemaDTO,
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                user: {
                    type: 'array',
                    items: {
                        properties: {
                            id: { type: 'uuid' },
                            deliveryManId: { type: 'uuid' },
                            recipientId: { type: 'uuid' },
                            deliveryAddressId: { type: 'uuid' },
                            photoId: { type: 'uuid' },
                            status: { type: 'string', example: client_1.$Enums.OrderStatus },
                            deliveryAt: { type: 'string', format: 'date-time' },
                            withdrawnAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            createdAt: { type: 'string', format: 'date-time' },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
        description: 'Unauthorized access',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(queryParamsSchema))),
    __param(1, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FetchOrderByDeliveryManIdController.prototype, "handler", null);
exports.FetchOrderByDeliveryManIdController = FetchOrderByDeliveryManIdController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-man/:deliveryManId/deliveries'),
    __metadata("design:paramtypes", [fetch_order_by_delivery_man_id_use_case_1.FetchOrderByDeliveryManIdUseCase])
], FetchOrderByDeliveryManIdController);
//# sourceMappingURL=fetch-order-by-delivery-man-id.controller.js.map