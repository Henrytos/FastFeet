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
exports.FetchOrderNearbyController = void 0;
const fetch_nearby_orders_1 = require("../../../domain/delivery/application/use-cases/fetch-nearby-orders");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const current_user_1 = require("../../auth/current-user");
const order_with_distance_presenter_1 = require("../presenters/order-with-distance-presenter");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const client_1 = require("@prisma/client");
const queryFetchOrderNearbySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().optional().default(1),
});
const validationQueryFetchNearby = new zod_validation_pipe_1.ZodValidationPipe(queryFetchOrderNearbySchema);
const bodyFetchOrderNearbySchema = zod_1.z.object({
    latitude: zod_1.z.coerce.number(),
    longitude: zod_1.z.coerce.number(),
});
const validationBodyFetchNearby = new zod_validation_pipe_1.ZodValidationPipe(bodyFetchOrderNearbySchema);
let FetchOrderNearbyController = class FetchOrderNearbyController {
    constructor(fetchNearbyOrdersWithDistanceUseCase) {
        this.fetchNearbyOrdersWithDistanceUseCase = fetchNearbyOrdersWithDistanceUseCase;
    }
    async handler({ page }, { latitude, longitude }, deliveryMan) {
        const result = await this.fetchNearbyOrdersWithDistanceUseCase.execute({
            from: {
                deliveryManLatitude: latitude,
                deliveryManLongitude: longitude,
            },
            page,
            deliveryManId: deliveryMan.sub,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        const ordersWithDistance = result.value.ordersWithDistance;
        return {
            orders: ordersWithDistance.map(order_with_distance_presenter_1.OrderWithDistancePresenter.toHTTP),
        };
    }
};
exports.FetchOrderNearbyController = FetchOrderNearbyController;
__decorate([
    (0, common_1.Get)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('DELIVERY_MAN'),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                orders: {
                    type: 'array',
                    items: {
                        type: 'object',
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
                            distanceInKms: { type: 'number', example: 0.5 },
                        },
                    },
                },
            },
        },
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)(validationQueryFetchNearby)),
    __param(1, (0, common_1.Body)(validationBodyFetchNearby)),
    __param(2, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FetchOrderNearbyController.prototype, "handler", null);
exports.FetchOrderNearbyController = FetchOrderNearbyController = __decorate([
    (0, common_1.Controller)('orders/nearby'),
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [fetch_nearby_orders_1.FetchNearbyOrdersWithDistanceUseCase])
], FetchOrderNearbyController);
//# sourceMappingURL=fetch-nearby-order.controller.js.map