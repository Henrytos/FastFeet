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
exports.OnOrderCancellationEventHandler = void 0;
const send_notification_use_case_1 = require("../use-cases/send-notification-use-case");
const domain_events_1 = require("../../../../core/events/domain-events");
const order_canceled_event_1 = require("../../../delivery/enterprise/events/order-canceled-event");
const common_1 = require("@nestjs/common");
let OnOrderCancellationEventHandler = class OnOrderCancellationEventHandler {
    constructor(sendNotificationUseCase) {
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNotificationToRecipient.bind(this), order_canceled_event_1.OrderCanceledEvent.name);
    }
    async sendNotificationToRecipient({ order }) {
        if (order) {
            await this.sendNotificationUseCase.execute({
                recipientId: order.recipientId.toString(),
                title: `Pedido ${order.id.toString()} cancelado`,
                content: `
          O pedido ${order.id.toString()} foi cancelado.
          Em caso de dúvidas, entre em contato com o suporte.  
        `,
            });
        }
    }
};
exports.OnOrderCancellationEventHandler = OnOrderCancellationEventHandler;
exports.OnOrderCancellationEventHandler = OnOrderCancellationEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [send_notification_use_case_1.SendNotificationUseCase])
], OnOrderCancellationEventHandler);
//# sourceMappingURL=on-order-cancellation-event-handler.js.map