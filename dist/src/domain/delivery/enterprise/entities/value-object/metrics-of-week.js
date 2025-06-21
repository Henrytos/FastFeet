"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsOfWeek = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class MetricsOfWeek extends value_object_1.ValueObject {
    static create(props) {
        const metricsOfWeek = new MetricsOfWeek(props);
        return metricsOfWeek;
    }
    get orderDelivered() {
        return this.props.orderDelivered;
    }
    get orderCanceled() {
        return this.props.orderCanceled;
    }
}
exports.MetricsOfWeek = MetricsOfWeek;
//# sourceMappingURL=metrics-of-week.js.map