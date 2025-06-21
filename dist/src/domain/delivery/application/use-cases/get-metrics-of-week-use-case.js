"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMetricsOfWeekUseCase = void 0;
const either_1 = require("../../../../core/either");
const administrator_does_not_exist_error_1 = require("./errors/administrator-does-not-exist-error");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
class GetMetricsOfWeekUseCase {
    constructor(administratorsRepository, ordersRepository) {
        this.administratorsRepository = administratorsRepository;
        this.ordersRepository = ordersRepository;
    }
    async execute({ administratorId, pastTargetWeek, }) {
        if (typeof pastTargetWeek !== 'number') {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const pastTargetWeekParse = Math.abs(pastTargetWeek);
        const administrator = await this.administratorsRepository.findById(administratorId);
        if (!administrator) {
            return (0, either_1.left)(new administrator_does_not_exist_error_1.AdministratorDoesNotExistError());
        }
        const metricsOfWeek = await this.ordersRepository.getMetricsOfWeek(pastTargetWeekParse);
        return (0, either_1.right)({
            metrics: metricsOfWeek,
        });
    }
}
exports.GetMetricsOfWeekUseCase = GetMetricsOfWeekUseCase;
//# sourceMappingURL=get-metrics-of-week-use-case.js.map