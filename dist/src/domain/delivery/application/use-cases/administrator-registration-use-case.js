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
exports.AdministratorRegistrationUseCase = void 0;
const either_1 = require("../../../../core/either");
const administrators_repository_1 = require("../repositories/administrators-repository");
const hash_generator_1 = require("../cryptography/hash-generator");
const administrator_1 = require("../../enterprise/entities/administrator");
const cpf_1 = require("../../enterprise/entities/value-object/cpf");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
const common_1 = require("@nestjs/common");
let AdministratorRegistrationUseCase = class AdministratorRegistrationUseCase {
    constructor(administratorsRepository, hashGenerator) {
        this.administratorsRepository = administratorsRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ name, cpf, password, }) {
        const passwordHash = await this.hashGenerator.hash(password);
        const administratorAlreadyExists = await this.administratorsRepository.findByCpf(cpf_1.Cpf.create(cpf));
        if (administratorAlreadyExists) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError(cpf));
        }
        const administrator = administrator_1.Administrator.create({
            name,
            password: passwordHash,
            cpf: cpf_1.Cpf.create(cpf),
        });
        await this.administratorsRepository.create(administrator);
        return (0, either_1.right)({ administrator });
    }
};
exports.AdministratorRegistrationUseCase = AdministratorRegistrationUseCase;
exports.AdministratorRegistrationUseCase = AdministratorRegistrationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrators_repository_1.AdministratorsRepository,
        hash_generator_1.HashGenerator])
], AdministratorRegistrationUseCase);
//# sourceMappingURL=administrator-registration-use-case.js.map