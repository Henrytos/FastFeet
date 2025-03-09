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
exports.FetchRecipientUseCase = void 0;
const either_1 = require("../../../../core/either");
const recipients_repository_1 = require("../repositories/recipients-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const administrators_repository_1 = require("../repositories/administrators-repository");
const common_1 = require("@nestjs/common");
let FetchRecipientUseCase = class FetchRecipientUseCase {
    constructor(recipientsRepository, administratorsRepository) {
        this.recipientsRepository = recipientsRepository;
        this.administratorsRepository = administratorsRepository;
    }
    async execute({ administratorId, page, perPage, }) {
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const recipients = await this.recipientsRepository.fetchRecipients(page, perPage);
        return (0, either_1.right)({ recipients });
    }
};
exports.FetchRecipientUseCase = FetchRecipientUseCase;
exports.FetchRecipientUseCase = FetchRecipientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recipients_repository_1.RecipientsRepository,
        administrators_repository_1.AdministratorsRepository])
], FetchRecipientUseCase);
//# sourceMappingURL=fetch-recipient-use-case.js.map