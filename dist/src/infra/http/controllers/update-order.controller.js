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
exports.UpdateOrderCOntroller = void 0;
const common_1 = require("@nestjs/common");
const update_order_use_case_1 = require("../../../domain/delivery/application/use-cases/update-order-use-case");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const current_user_1 = require("../../auth/current-user");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const order_status_enum_1 = require("../../../core/constants/order-status.enum");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const update_delivery_address_use_case_1 = require("../../../domain/delivery/application/use-cases/update-delivery-address-use-case");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const routeParamsUpdateOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid(),
});
const bodyUpdateOrderSchema = zod_1.z.object({
    status: zod_1.z.enum(['PENDING', 'DELIVERED', 'WITHDRAWN']),
    deliveryManId: zod_1.z.string().uuid(),
    deliveryAt: zod_1.z.string().transform((date) => new Date(date)),
    withdrawnAt: zod_1.z.string().transform((date) => new Date(date)),
    address: zod_1.z.object({
        state: zod_1.z.string(),
        city: zod_1.z.string(),
        neighborhood: zod_1.z.string(),
        street: zod_1.z.string(),
        zip: zod_1.z.string(),
        number: zod_1.z.string(),
        latitude: zod_1.z.coerce.number(),
        longitude: zod_1.z.coerce.number(),
    }),
});
let UpdateOrderCOntroller = class UpdateOrderCOntroller {
    constructor(updateOrderUseCase, updateDeliveryAddressUseCase) {
        this.updateOrderUseCase = updateOrderUseCase;
        this.updateDeliveryAddressUseCase = updateDeliveryAddressUseCase;
    }
    async handler({ orderId }, { status, deliveryManId, deliveryAt, withdrawnAt, address, }, administrator) {
        const result = await this.updateOrderUseCase.execute({
            administratorId: administrator.sub,
            status: order_status_enum_1.ORDER_STATUS[status],
            deliveryAt,
            deliveryManId,
            orderId,
            withdrawnAt,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.NotFoundException(result.value.message);
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        const resultUpdateDeliveryAddress = await this.updateDeliveryAddressUseCase.execute({
            administratorId: administrator.sub,
            deliveryAddressId: result.value.order.deliveryAddressId.toString(),
            state: address.state,
            city: address.city,
            neighborhood: address.neighborhood,
            street: address.street,
            zip: address.zip,
            number: address.number,
            latitude: address.latitude,
            longitude: address.longitude,
        });
        if (resultUpdateDeliveryAddress.isLeft()) {
            switch (resultUpdateDeliveryAddress.value.constructor) {
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.NotFoundException(resultUpdateDeliveryAddress.value.message);
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(resultUpdateDeliveryAddress.value.message);
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.BadRequestException(resultUpdateDeliveryAddress.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            message: 'Order updated successfully',
        };
    }
};
exports.UpdateOrderCOntroller = UpdateOrderCOntroller;
__decorate([
    (0, common_1.Put)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'orderId',
        type: 'string',
        required: true,
        format: 'uuid',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: ['PENDING', 'DELIVERED', 'WITHDRAWN'],
                    example: 'PENDING',
                },
                deliveryManId: {
                    type: 'string',
                    format: 'uuid',
                    example: 'b8007c0c-3452-4d0b-912f-615c2a81b5e3',
                },
                deliveryAt: {
                    type: 'string',
                    format: 'date-time',
                    example: new Date().toString(),
                },
                withdrawnAt: {
                    type: 'string',
                    format: 'date-time',
                    example: new Date().toString(),
                },
                address: {
                    type: 'object',
                    properties: {
                        state: { type: 'string' },
                        city: { type: 'string' },
                        neighborhood: { type: 'string' },
                        street: { type: 'string' },
                        zip: { type: 'string' },
                        number: { type: 'string' },
                        latitude: { type: 'number' },
                        longitude: { type: 'number' },
                    },
                    required: [
                        'state',
                        'city',
                        'neighborhood',
                        'street',
                        'zip',
                        'number',
                        'latitude',
                        'longitude',
                    ],
                },
            },
            required: ['status', 'deliveryManId', 'deliveryAt', 'address'],
            format: 'json',
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Order updated successfully' },
            },
        },
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsUpdateOrderSchema))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateOrderCOntroller.prototype, "handler", null);
exports.UpdateOrderCOntroller = UpdateOrderCOntroller = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/orders/:orderId'),
    __metadata("design:paramtypes", [update_order_use_case_1.UpdateOrderUseCase,
        update_delivery_address_use_case_1.UpdateDeliveryAddressUseCase])
], UpdateOrderCOntroller);
//# sourceMappingURL=update-order.controller.js.map