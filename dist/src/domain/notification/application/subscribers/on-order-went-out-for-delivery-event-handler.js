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
exports.OnOrderWentOutForDeliveryEventHandler = void 0;
const send_notification_use_case_1 = require("../use-cases/send-notification-use-case");
const domain_events_1 = require("../../../../core/events/domain-events");
const order_withdrawn_event_1 = require("../../../delivery/enterprise/events/order-withdrawn-event");
const common_1 = require("@nestjs/common");
let OnOrderWentOutForDeliveryEventHandler = class OnOrderWentOutForDeliveryEventHandler {
    constructor(sendNotificationUseCase) {
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNotificationToRecipient.bind(this), order_withdrawn_event_1.OrderWithdrawnEvent.name);
    }
    async sendNotificationToRecipient({ order }) {
        await this.sendNotificationUseCase.execute({
            recipientId: order.recipientId.toString(),
            title: 'Pedido saiu para entrega',
            content: `
        Seu pedido: ${order.id} saiu para entrega!
        Nosso entregador está a caminho.
        Em breve você receberá mais informações sobre o status do pedido.
      `,
        });
    }
};
exports.OnOrderWentOutForDeliveryEventHandler = OnOrderWentOutForDeliveryEventHandler;
exports.OnOrderWentOutForDeliveryEventHandler = OnOrderWentOutForDeliveryEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [send_notification_use_case_1.SendNotificationUseCase])
], OnOrderWentOutForDeliveryEventHandler);
//# sourceMappingURL=on-order-went-out-for-delivery-event-handler.js.map