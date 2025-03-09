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
exports.FetchDeliveryManController = void 0;
const common_1 = require("@nestjs/common");
const delivery_man_presenter_1 = require("../presenters/delivery-man-presenter");
const fetch_delivery_man_use_case_1 = require("../../../domain/delivery/application/use-cases/fetch-delivery-man-use-case");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const fetch_schema_dto_1 = require("../dtos/fetch-schema.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const queryParamsSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).optional().default(1),
    perPage: zod_1.z.coerce.number().min(1).optional().default(10),
});
let FetchDeliveryManController = class FetchDeliveryManController {
    constructor(fetchDeliveryMansUseCase) {
        this.fetchDeliveryMansUseCase = fetchDeliveryMansUseCase;
    }
    async handler({ sub }, { page, perPage }) {
        const result = await this.fetchDeliveryMansUseCase.execute({
            page,
            perPage,
            administratorId: sub,
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
            user: result.value.deliveryMans.map(delivery_man_presenter_1.DeliveryManPresenter.toHTTP),
        };
    }
};
exports.FetchDeliveryManController = FetchDeliveryManController;
__decorate([
    (0, common_1.Get)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
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
                        $ref: '#/components/schemas/DeliveryMan',
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
    __param(0, (0, current_user_1.CurrentUser)()),
    __param(1, (0, common_1.Query)(new zod_validation_pipe_1.ZodValidationPipe(queryParamsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FetchDeliveryManController.prototype, "handler", null);
exports.FetchDeliveryManController = FetchDeliveryManController = __decorate([
    (0, swagger_1.ApiTags)('delivery-man'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/delivery-mans'),
    __metadata("design:paramtypes", [fetch_delivery_man_use_case_1.FetchDeliveryMansUseCase])
], FetchDeliveryManController);
//# sourceMappingURL=fetch-delivery-man.controller.js.map