"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const administrators_repository_1 = require("../../domain/delivery/application/repositories/administrators-repository");
const prisma_administrators_repository_1 = require("./prisma/repositories/prisma-administrators-repository");
const delivery_mans_repository_1 = require("../../domain/delivery/application/repositories/delivery-mans-repository");
const prisma_delivery_mans_repository_1 = require("./prisma/repositories/prisma-delivery-mans-repository");
const notifications_repository_1 = require("../../domain/notification/application/repositories/notifications-repository");
const orders_repository_1 = require("../../domain/delivery/application/repositories/orders-repository");
const prisma_orders_repository_1 = require("./prisma/repositories/prisma-orders-repository");
const photos_repository_1 = require("../../domain/delivery/application/repositories/photos-repository");
const prisma_photos_repository_1 = require("./prisma/repositories/prisma-photos-repository");
const recipients_repository_1 = require("../../domain/delivery/application/repositories/recipients-repository");
const prisma_recipients_repository_1 = require("./prisma/repositories/prisma-recipients-repository");
const prisma_delivery_address_repository_1 = require("./prisma/repositories/prisma-delivery-address-repository");
const delivery_address_repository_1 = require("../../domain/delivery/application/repositories/delivery-address-repository");
const prisma_notifications_repository_1 = require("./prisma/repositories/prisma-notifications-repository");
const cache_module_1 = require("../cache/cache.module");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_module_1.CacheModule],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: administrators_repository_1.AdministratorsRepository,
                useClass: prisma_administrators_repository_1.PrismaAdministratorsRepository,
            },
            {
                provide: delivery_address_repository_1.DeliveryAddressRepository,
                useClass: prisma_delivery_address_repository_1.PrismaDeliveryAddressRepository,
            },
            {
                provide: delivery_mans_repository_1.DeliveryMansRepository,
                useClass: prisma_delivery_mans_repository_1.PrismaDeliveryMansRepository,
            },
            {
                provide: notifications_repository_1.NotificationsRepository,
                useClass: prisma_notifications_repository_1.PrismaNotificationsRepository,
            },
            {
                provide: orders_repository_1.OrdersRepository,
                useClass: prisma_orders_repository_1.PrismaOrdersRepository,
            },
            {
                provide: photos_repository_1.PhotosRepository,
                useClass: prisma_photos_repository_1.PrismaPhotosRepository,
            },
            {
                provide: recipients_repository_1.RecipientsRepository,
                useClass: prisma_recipients_repository_1.PrismaRecipientsRepository,
            },
        ],
        exports: [
            prisma_service_1.PrismaService,
            administrators_repository_1.AdministratorsRepository,
            delivery_address_repository_1.DeliveryAddressRepository,
            delivery_mans_repository_1.DeliveryMansRepository,
            notifications_repository_1.NotificationsRepository,
            orders_repository_1.OrdersRepository,
            photos_repository_1.PhotosRepository,
            recipients_repository_1.RecipientsRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map