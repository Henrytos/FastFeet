"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorPresenter = void 0;
class AdministratorPresenter {
    static toHTTP(administrator) {
        return {
            id: administrator.id.toString(),
            name: administrator.name,
            cpf: administrator.cpf.value,
            role: 'ADMINISTRATOR',
        };
    }
}
exports.AdministratorPresenter = AdministratorPresenter;
//# sourceMappingURL=administrator-presenter.js.map