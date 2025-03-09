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
exports.UpdateRecipientController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const update_recipient_use_case_1 = require("../../../domain/delivery/application/use-cases/update-recipient-use-case");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/recipient-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const recipient_body_dto_1 = require("../dtos/recipient-body.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const recipient_does_note_exist_message_dto_1 = require("../dtos/recipient-does-note-exist-message.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const updateRecipientBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
});
const updateRecipientParams = zod_1.z.object({
    recipientId: zod_1.z.string().uuid(),
});
let UpdateRecipientController = class UpdateRecipientController {
    constructor(updateRecipientUseCase) {
        this.updateRecipientUseCase = updateRecipientUseCase;
    }
    async handler(recipient, { recipientId }, administrator) {
        const { email, name } = recipient;
        const result = await this.updateRecipientUseCase.execute({
            name,
            email,
            recipientId,
            administratorId: administrator.sub,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case administrator_does_not_exist_error_1.AdministratorDoesNotExistError:
                    throw new common_1.UnauthorizedException(result.value.message);
                case recipient_does_not_exist_error_1.RecipientDoesNotExistError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException(result.value.message);
            }
        }
        return {
            message: 'recipient updated successfully',
        };
    }
};
exports.UpdateRecipientController = UpdateRecipientController;
__decorate([
    (0, common_1.Put)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'recipientId',
        description: 'The recipient id',
        type: 'string',
        required: true,
    }),
    (0, swagger_1.ApiBody)({
        description: 'The recipient data',
        required: true,
        type: recipient_body_dto_1.RecipientBodyDTO,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid recipient data',
        type: recipient_does_note_exist_message_dto_1.RecipientDoesNotExistErrorMessageDTO,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(updateRecipientBodySchema))),
    __param(1, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(updateRecipientParams))),
    __param(2, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateRecipientController.prototype, "handler", null);
exports.UpdateRecipientController = UpdateRecipientController = __decorate([
    (0, swagger_1.ApiTags)('recipient'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/recipients/:recipientId'),
    __metadata("design:paramtypes", [update_recipient_use_case_1.UpdateRecipientUseCase])
], UpdateRecipientController);
//# sourceMappingURL=update-recipient.controller.js.map