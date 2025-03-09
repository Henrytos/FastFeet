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
exports.GetDeliveryManByIdController = void 0;
const common_1 = require("@nestjs/common");
const delivery_man_presenter_1 = require("../presenters/delivery-man-presenter");
const get_delivery_man_by_id_use_case_1 = require("../../../domain/delivery/application/use-cases/get-delivery-man-by-id-use-case");
const delivery_man_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-man-does-not-exist-error");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const delivery_man_does_not_exist_message_dto_1 = require("../dtos/delivery-man-does-not-exist-message.dto");
const delivery_man_dto_1 = require("../dtos/delivery-man.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const routeParamsGetDeliveryManSchema = zod_1.z.object({
    deliveryManId: zod_1.z.string().uuid(),
});
let GetDeliveryManByIdController = class GetDeliveryManByIdController {
    constructor(getDeliveryManByIdUseCase) {
        this.getDeliveryManByIdUseCase = getDeliveryManByIdUseCase;
    }
    async handler({ deliveryManId }) {
        const result = await this.getDeliveryManByIdUseCase.execute({
            deliveryManId,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case delivery_man_does_not_exist_error_1.DeliveryManDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            user: delivery_man_presenter_1.DeliveryManPresenter.toHTTP(result.value.deliveryMan),
        };
    }
};
exports.GetDeliveryManByIdController = GetDeliveryManByIdController;
__decorate([
    (0, common_1.Get)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'deliveryManId',
        type: 'string',
        required: true,
        format: 'uuid',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: delivery_man_dto_1.DeliveryManDTO,
        description: 'Delivery man details',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: delivery_man_does_not_exist_message_dto_1.DeliveryManDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(routeParamsGetDeliveryManSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetDeliveryManByIdController.prototype, "handler", null);
exports.GetDeliveryManByIdController = GetDeliveryManByIdController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-mans/:deliveryManId'),
    __metadata("design:paramtypes", [get_delivery_man_by_id_use_case_1.GetDeliveryManByIdUseCase])
], GetDeliveryManByIdController);
//# sourceMappingURL=get-delivery-man-by-id.controller.js.map