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
exports.RegisterOrderForRecipientController = void 0;
const register_delivery_address_use_case_1 = require("../../../domain/delivery/application/use-cases/register-delivery-address-use-case");
const register_order_for_recipient_use_case_1 = require("../../../domain/delivery/application/use-cases/register-order-for-recipient-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/recipient-does-not-exist-error");
const delivery_address_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/delivery-address-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const recipient_does_note_exist_message_dto_1 = require("../dtos/recipient-does-note-exist-message.dto");
const delivery_address_body_dto_1 = require("../dtos/delivery-address-body.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const paramsRegisterOrderSchema = zod_1.z.object({
    recipientId: zod_1.z.string().uuid(),
});
const bodyRegisterOrderSchema = zod_1.z.object({
    state: zod_1.z.string(),
    city: zod_1.z.string(),
    neighborhood: zod_1.z.string(),
    street: zod_1.z.string(),
    zip: zod_1.z.string(),
    number: zod_1.z.string(),
    latitude: zod_1.z.coerce.number(),
    longitude: zod_1.z.coerce.number(),
});
let RegisterOrderForRecipientController = class RegisterOrderForRecipientController {
    constructor(registerOrderUseCase, registerDeliveryAddressUseCase) {
        this.registerOrderUseCase = registerOrderUseCase;
        this.registerDeliveryAddressUseCase = registerDeliveryAddressUseCase;
    }
    async handler({ recipientId }, body, administrator) {
        const resultCreatedDeliveryAddress = await this.registerDeliveryAddressUseCase.execute({
            administratorId: administrator.sub,
            state: body.state,
            city: body.city,
            neighborhood: body.neighborhood,
            street: body.street,
            zip: body.zip,
            number: body.number,
            latitude: body.latitude,
            longitude: body.longitude,
        });
        if (resultCreatedDeliveryAddress.isLeft()) {
            switch (resultCreatedDeliveryAddress.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(resultCreatedDeliveryAddress.value.message);
                default:
                    throw new common_1.InternalServerErrorException('An unexpected error occurred');
            }
        }
        const result = await this.registerOrderUseCase.execute({
            administratorId: administrator.sub,
            recipientId,
            deliveryAddressId: resultCreatedDeliveryAddress.value.deliveryAddress.id.toString(),
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case recipient_does_not_exist_error_1.RecipientDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                case delivery_address_does_not_exist_error_1.DeliveryAddressDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException('An unexpected error occurred');
            }
        }
        return {
            message: 'Order registered successfully',
        };
    }
};
exports.RegisterOrderForRecipientController = RegisterOrderForRecipientController;
__decorate([
    (0, common_1.Post)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'recipientId',
        type: 'string',
        format: 'uuid',
        description: 'The recipient id',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        description: 'The delivery address data',
        type: delivery_address_body_dto_1.DeliveryAddressBodyDTO,
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Order registered successfully',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Order registered successfully',
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
        description: 'Unauthorized access',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: recipient_does_note_exist_message_dto_1.RecipientDoesNotExistErrorMessageDTO,
        description: 'Invalid recipient',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid delivery address',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(paramsRegisterOrderSchema))),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bodyRegisterOrderSchema))),
    __param(2, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RegisterOrderForRecipientController.prototype, "handler", null);
exports.RegisterOrderForRecipientController = RegisterOrderForRecipientController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/orders/:recipientId'),
    __metadata("design:paramtypes", [register_order_for_recipient_use_case_1.RegisterOrderForRecipientUseCase,
        register_delivery_address_use_case_1.RegisterDeliveryAddressUseCase])
], RegisterOrderForRecipientController);
//# sourceMappingURL=register-order-for-recipient.controller.js.map