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
exports.UpdateRecipientUseCase = void 0;
const either_1 = require("../../../../core/either");
const recipients_repository_1 = require("../repositories/recipients-repository");
const administrators_repository_1 = require("../repositories/administrators-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const recipient_does_not_exist_error_1 = require("./errors/recipient-does-not-exist-error");
const common_1 = require("@nestjs/common");
let UpdateRecipientUseCase = class UpdateRecipientUseCase {
    constructor(administratorsRepository, recipientsRepository) {
        this.administratorsRepository = administratorsRepository;
        this.recipientsRepository = recipientsRepository;
    }
    async execute({ administratorId, recipientId, name, email, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const recipient = await this.recipientsRepository.findById(recipientId);
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        recipient.name = name;
        recipient.email = email;
        await this.recipientsRepository.save(recipient);
        return (0, either_1.right)({});
    }
};
exports.UpdateRecipientUseCase = UpdateRecipientUseCase;
exports.UpdateRecipientUseCase = UpdateRecipientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrators_repository_1.AdministratorsRepository,
        recipients_repository_1.RecipientsRepository])
], UpdateRecipientUseCase);
//# sourceMappingURL=update-recipient-use-case.js.map