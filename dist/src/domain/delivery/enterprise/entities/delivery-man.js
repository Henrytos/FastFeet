"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryMan = void 0;
const entity_1 = require("../../../../core/entities/entity");
class DeliveryMan extends entity_1.Entity {
    get cpf() {
        return this.props.cpf;
    }
    get password() {
        return this.props.password;
    }
    set password(password) {
        this.props.password = password;
    }
    get name() {
        return this.props.name;
    }
    static create(props, id) {
        const deliveryMan = new DeliveryMan(props, id);
        return deliveryMan;
    }
}
exports.DeliveryMan = DeliveryMan;
//# sourceMappingURL=delivery-man.js.map