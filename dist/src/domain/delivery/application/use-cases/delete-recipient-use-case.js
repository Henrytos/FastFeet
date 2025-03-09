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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecipientUseCase = void 0;
const either_1 = require("../../../../core/either");
const recipient_does_not_exist_error_1 = require("./errors/recipient-does-not-exist-error");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const recipients_repository_1 = require("../repositories/recipients-repository");
const administrators_repository_1 = require("../repositories/administrators-repository");
const common_1 = require("@nestjs/common");
let DeleteRecipientUseCase = class DeleteRecipientUseCase {
    constructor(recipientsRepository, administratorsRepository) {
        this.recipientsRepository = recipientsRepository;
        this.administratorsRepository = administratorsRepository;
    }
    async execute({ recipientId, administratorId, }) {
        const recipient = await this.recipientsRepository.findById(recipientId);
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        await this.recipientsRepository.delete(recipient);
        return (0, either_1.right)({});
    }
};
exports.DeleteRecipientUseCase = DeleteRecipientUseCase;
exports.DeleteRecipientUseCase = DeleteRecipientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recipients_repository_1.RecipientsRepository,
        administrators_repository_1.AdministratorsRepository])
], DeleteRecipientUseCase);
//# sourceMappingURL=delete-recipient-use-case.js.map