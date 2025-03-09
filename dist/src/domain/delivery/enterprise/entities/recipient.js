"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Recipient extends entity_1.Entity {
    get name() {
        return this.props.name;
    }
    set name(name) {
        this.props.name = name;
    }
    get email() {
        return this.props.email;
    }
    set email(email) {
        this.props.email = email;
    }
    static create(props, id) {
        const recipient = new Recipient(props, id);
        return recipient;
    }
}
exports.Recipient = Recipient;
//# sourceMappingURL=recipient.js.map