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
exports.SendingOrderToRecipientByDeliveryManController = void 0;
const sending_order_to_recipient_by_delivery_person_use_case_1 = require("../../../domain/delivery/application/use-cases/sending-order-to-recipient-by-delivery-person-use-case");
const current_user_1 = require("../../auth/current-user");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const delivery_address_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const order_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/order-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/recipient-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const routeParamsSendingOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid(),
});
let SendingOrderToRecipientByDeliveryManController = class SendingOrderToRecipientByDeliveryManController {
    constructor(sendingOrderToRecipientByDeliveryManUseCase) {
        this.sendingOrderToRecipientByDeliveryManUseCase = sendingOrderToRecipientByDeliveryManUseCase;
    }
    async handler({ orderId }, deliveryMan) {
        const result = await this.sendingOrderToRecipientByDeliveryManUseCase.execute({
            deliveryManId: deliveryMan.sub,
            orderId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case order_does_not_exist_error_1.OrderDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case recipient_does_not_exist_error_1.RecipientDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case delivery_address_does_not_exist_error_1.DeliveryAddressDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
    }
};
exports.SendingOrderToRecipientByDeliveryManController = SendingOrderToRecipientByDeliveryManController;
__decorate([
    (0, common_1.Patch)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('DELIVERY_MAN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsSendingOrderSchema))),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SendingOrderToRecipientByDeliveryManController.prototype, "handler", null);
exports.SendingOrderToRecipientByDeliveryManController = SendingOrderToRecipientByDeliveryManController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('/orders/:orderId/pickup'),
    __metadata("design:paramtypes", [sending_order_to_recipient_by_delivery_person_use_case_1.SendingOrderToRecipientByDeliveryManUseCase])
], SendingOrderToRecipientByDeliveryManController);
//# sourceMappingURL=sending-order-to-recipient-by-delivery-man.controller.js.map