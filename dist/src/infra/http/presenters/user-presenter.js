"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    static toHTTP(user) {
        return {
            id: user.id.toString(),
            name: user.name,
            cpf: user.cpf,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
exports.UserPresenter = UserPresenter;
//# sourceMappingURL=user-presenter.js.map