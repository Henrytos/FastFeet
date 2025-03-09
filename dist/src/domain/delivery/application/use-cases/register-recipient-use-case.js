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
exports.RegisterRecipientUseCase = void 0;
const either_1 = require("../../../../core/either");
const recipients_repository_1 = require("../repositories/recipients-repository");
const recipient_1 = require("../../enterprise/entities/recipient");
const administrators_repository_1 = require("../repositories/administrators-repository");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
const common_1 = require("@nestjs/common");
let RegisterRecipientUseCase = class RegisterRecipientUseCase {
    constructor(recipientsRepository, administratorsRepository) {
        this.recipientsRepository = recipientsRepository;
        this.administratorsRepository = administratorsRepository;
    }
    async execute({ name, email, administratorId, }) {
        const administratorDoesNotExists = !(await this.administratorsRepository.findById(administratorId));
        if (administratorDoesNotExists) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const emailAlreadyExists = Boolean(await this.recipientsRepository.findByEmail(email));
        if (emailAlreadyExists) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const recipient = recipient_1.Recipient.create({
            email,
            name,
        });
        await this.recipientsRepository.create(recipient);
        return (0, either_1.right)({});
    }
};
exports.RegisterRecipientUseCase = RegisterRecipientUseCase;
exports.RegisterRecipientUseCase = RegisterRecipientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recipients_repository_1.RecipientsRepository,
        administrators_repository_1.AdministratorsRepository])
], RegisterRecipientUseCase);
//# sourceMappingURL=register-recipient-use-case.js.map