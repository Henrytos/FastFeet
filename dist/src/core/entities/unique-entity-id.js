"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityID = void 0;
const node_crypto_1 = require("node:crypto");
class UniqueEntityID {
    constructor(id) {
        this.value = id ?? (0, node_crypto_1.randomUUID)();
    }
    toString() {
        return this.value.toString();
    }
    toValue() {
        return this.value.toString();
    }
    equals(id) {
        return id.toValue() === this.value;
    }
}
exports.UniqueEntityID = UniqueEntityID;
//# sourceMappingURL=unique-entity-id.js.map