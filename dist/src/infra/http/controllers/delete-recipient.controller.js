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
exports.DeleteRecipientController = void 0;
const delete_recipient_use_case_1 = require("../../../domain/delivery/application/use-cases/delete-recipient-use-case");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const current_user_1 = require("../../auth/current-user");
const administrator_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/administrator-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("../../../domain/delivery/application/use-cases/errors/recipient-does-not-exist-error");
const swagger_1 = require("@nestjs/swagger");
const administrator_does_not_exist_message_dto_1 = require("../dtos/administrator-does-not-exist-message.dto");
const recipient_does_note_exist_message_dto_1 = require("../dtos/recipient-does-note-exist-message.dto");
const format_token_dto_1 = require("../dtos/format-token.dto");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const paramsDeleteRecipientSchema = zod_1.z.object({
    recipientId: zod_1.z.string().uuid(),
});
let DeleteRecipientController = class DeleteRecipientController {
    constructor(deleteRecipientUseCase) {
        this.deleteRecipientUseCase = deleteRecipientUseCase;
    }
    async handler({ recipientId }, administrator) {
        const result = await this.deleteRecipientUseCase.execute({
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
    }
};
exports.DeleteRecipientController = DeleteRecipientController;
__decorate([
    (0, common_1.Delete)(),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('ADMINISTRATOR'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, swagger_1.ApiParam)({
        name: 'recipientId',
        description: 'The recipient id',
        type: 'string',
    }),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: administrator_does_not_exist_message_dto_1.AdministratorDoesNotExistMessageDTO,
        description: 'Unauthorized access',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        type: recipient_does_note_exist_message_dto_1.RecipientDoesNotExistErrorMessageDTO,
        description: 'recipient does not exist',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)(new zod_validation_pipe_1.ZodValidationPipe(paramsDeleteRecipientSchema))),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeleteRecipientController.prototype, "handler", null);
exports.DeleteRecipientController = DeleteRecipientController = __decorate([
    (0, swagger_1.ApiTags)('recipient'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/recipients/:recipientId'),
    __metadata("design:paramtypes", [delete_recipient_use_case_1.DeleteRecipientUseCase])
], DeleteRecipientController);
//# sourceMappingURL=delete-recipient.controller.js.map