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
exports.AuthenticateUserUseCase = void 0;
const either_1 = require("../../../../core/either");
const encrypter_1 = require("../cryptography/encrypter");
const hash_comparer_1 = require("../cryptography/hash-comparer");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
const cpf_1 = require("../../enterprise/entities/value-object/cpf");
const delivery_mans_repository_1 = require("../repositories/delivery-mans-repository");
const common_1 = require("@nestjs/common");
const administrators_repository_1 = require("../repositories/administrators-repository");
const role_enum_1 = require("../../../../core/constants/role.enum");
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(deliveryMansRepository, administratorsRepository, encrypter, hashComparer) {
        this.deliveryMansRepository = deliveryMansRepository;
        this.administratorsRepository = administratorsRepository;
        this.encrypter = encrypter;
        this.hashComparer = hashComparer;
    }
    async execute({ cpf, password, }) {
        const deliveryMan = await this.deliveryMansRepository.findByCpf(cpf_1.Cpf.create(cpf));
        if (deliveryMan) {
            const deliveryManPasswordMatch = await this.hashComparer.comparer(password, deliveryMan.password);
            if (!deliveryManPasswordMatch) {
                return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
            }
            const accessToken = await this.encrypter.encrypt({
                sub: deliveryMan.id.toString(),
                role: role_enum_1.USER_ROLE.DELIVERY_MAN,
            });
            return (0, either_1.right)({ accessToken });
        }
        const administrator = await this.administratorsRepository.findByCpf(cpf_1.Cpf.create(cpf));
        if (administrator) {
            const administratorPasswordMAtch = await this.hashComparer.comparer(password, administrator.password);
            if (!administratorPasswordMAtch) {
                return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
            }
            const accessToken = await this.encrypter.encrypt({
                role: role_enum_1.USER_ROLE.ADMINISTRATOR,
                sub: administrator.id.toString(),
            });
            return (0, either_1.right)({ accessToken });
        }
        if (!administrator || !deliveryMan) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
    }
};
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
exports.AuthenticateUserUseCase = AuthenticateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_mans_repository_1.DeliveryMansRepository,
        administrators_repository_1.AdministratorsRepository,
        encrypter_1.Encrypter,
        hash_comparer_1.HashComparer])
], AuthenticateUserUseCase);
//# sourceMappingURL=authenticate-user-use-case.js.map