"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrator = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Administrator extends entity_1.Entity {
    get cpf() {
        return this.props.cpf;
    }
    get password() {
        return this.props.password;
    }
    get name() {
        return this.props.name;
    }
    static create(props, id) {
        const administrator = new Administrator(props, id);
        return administrator;
    }
}
exports.Administrator = Administrator;
//# sourceMappingURL=administrator.js.map