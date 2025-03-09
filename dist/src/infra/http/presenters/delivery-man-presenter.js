"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryManPresenter = void 0;
class DeliveryManPresenter {
    static toHTTP(deliveryMan) {
        return {
            id: deliveryMan.id.toString(),
            name: deliveryMan.name,
            cpf: deliveryMan.cpf.value,
            role: 'DELIVERY_MAN',
        };
    }
}
exports.DeliveryManPresenter = DeliveryManPresenter;
//# sourceMappingURL=delivery-man-presenter.js.map