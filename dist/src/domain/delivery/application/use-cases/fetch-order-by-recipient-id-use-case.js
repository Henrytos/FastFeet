"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchOrderByRecipientIdUseCase = void 0;
const either_1 = require("../../../../core/either");
const recipient_does_not_exist_error_1 = require("./errors/recipient-does-not-exist-error");
class FetchOrderByRecipientIdUseCase {
    constructor(recipientsRepository, ordersRepository) {
        this.recipientsRepository = recipientsRepository;
        this.ordersRepository = ordersRepository;
    }
    async execute({ recipientId, page, }) {
        const recipient = await this.recipientsRepository.findById(recipientId);
        if (!recipient) {
            return (0, either_1.left)(new recipient_does_not_exist_error_1.RecipientDoesNotExistError());
        }
        const orders = await this.ordersRepository.fetchOrdersByRecipientId(recipientId, page);
        return (0, either_1.right)({ orders });
    }
}
exports.FetchOrderByRecipientIdUseCase = FetchOrderByRecipientIdUseCase;
//# sourceMappingURL=fetch-order-by-recipient-id-use-case.js.map