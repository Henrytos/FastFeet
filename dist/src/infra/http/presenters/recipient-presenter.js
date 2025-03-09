"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientPresenter = void 0;
class RecipientPresenter {
    static toHTTP(recipient) {
        return {
            id: recipient.id.toString(),
            name: recipient.name,
            email: recipient.email,
        };
    }
}
exports.RecipientPresenter = RecipientPresenter;
//# sourceMappingURL=recipient-presenter.js.map