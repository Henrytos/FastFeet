"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const read_notification_use_case_1 = require("../../domain/notification/application/use-cases/read-notification-use-case");
const send_notification_use_case_1 = require("../../domain/notification/application/use-cases/send-notification-use-case");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const on_order_created_event_handler_1 = require("../../domain/notification/application/subscribers/on-order-created-event-handler");
const on_order_went_out_for_delivery_event_handler_1 = require("../../domain/notification/application/subscribers/on-order-went-out-for-delivery-event-handler");
const on_order_delivered_event_handler_1 = require("../../domain/notification/application/subscribers/on-order-delivered-event-handler");
const on_order_cancellation_event_handler_1 = require("../../domain/notification/application/subscribers/on-order-cancellation-event-handler");
const env_module_1 = require("../env/env.module");
const email_module_1 = require("../email/email.module");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, env_module_1.EnvModule, email_module_1.EmailModule],
        providers: [
            send_notification_use_case_1.SendNotificationUseCase,
            read_notification_use_case_1.ReadNotificationUseCase,
            on_order_created_event_handler_1.OnOrderCreatedEventHandler,
            on_order_went_out_for_delivery_event_handler_1.OnOrderWentOutForDeliveryEventHandler,
            on_order_delivered_event_handler_1.OnOrderDeliveredEventHandler,
            on_order_cancellation_event_handler_1.OnOrderCancellationEventHandler,
        ],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map