"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnOrderDeliveredEventHandler = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const order_make_delivered_event_1 = require("../../../delivery/enterprise/events/order-make-delivered-event");
const send_notification_use_case_1 = require("../use-cases/send-notification-use-case");
const common_1 = require("@nestjs/common");
let OnOrderDeliveredEventHandler = class OnOrderDeliveredEventHandler {
    constructor(sendNotification) {
        this.sendNotification = sendNotification;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNotificationToRecipient.bind(this), order_make_delivered_event_1.OrderMakeDeliveredEvent.name);
    }
    async sendNotificationToRecipient({ order, }) {
        if (order) {
            await this.sendNotification.execute({
                recipientId: order.recipientId.toString(),
                title: 'Pedido Entregue',
                content: `
          Seu pedido: ${order.id} foi entregue com sucesso!
          Obrigado por escolher a nossa empresa.
          Volte sempre!
        `,
            });
        }
    }
};
exports.OnOrderDeliveredEventHandler = OnOrderDeliveredEventHandler;
exports.OnOrderDeliveredEventHandler = OnOrderDeliveredEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [send_notification_use_case_1.SendNotificationUseCase])
], OnOrderDeliveredEventHandler);
//# sourceMappingURL=on-order-delivered-event-handler.js.map