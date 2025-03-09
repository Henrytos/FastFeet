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
exports.PrismaRecipientsRepository = void 0;
const prisma_service_1 = require("../prisma.service");
const prisma_recipient_mapper_1 = require("../mappers/prisma-recipient-mapper");
const orders_repository_1 = require("../../../../domain/delivery/application/repositories/orders-repository");
const common_1 = require("@nestjs/common");
let PrismaRecipientsRepository = class PrismaRecipientsRepository {
    constructor(prisma, ordersRepository) {
        this.prisma = prisma;
        this.ordersRepository = ordersRepository;
    }
    async findById(id) {
        const recipient = await this.prisma.recipient.findFirst({
            where: {
                id,
            },
        });
        if (!recipient) {
            return null;
        }
        return prisma_recipient_mapper_1.PrismaRecipientMapper.toDomain(recipient);
    }
    async create(recipient) {
        const data = prisma_recipient_mapper_1.PrismaRecipientMapper.toPrisma(recipient);
        await this.prisma.recipient.create({ data });
    }
    async findByEmail(email) {
        const recipient = await this.prisma.recipient.findFirst({
            where: {
                email,
            },
        });
        if (!recipient) {
            return null;
        }
        return prisma_recipient_mapper_1.PrismaRecipientMapper.toDomain(recipient);
    }
    async delete(recipient) {
        const recipientAlreadyExists = this.findByEmail(recipient.email);
        if (!recipientAlreadyExists) {
            throw new Error('Recipient not found');
        }
        await this.prisma.recipient.delete({
            where: {
                id: recipient.id.toString(),
            },
        });
        await this.ordersRepository.deleteManyByRecipientId(recipient.id.toString());
    }
    async save(recipient) {
        const recipientAlreadyExists = this.findById(recipient.id.toString());
        if (!recipientAlreadyExists) {
            throw new Error('Recipient not found');
        }
        const data = prisma_recipient_mapper_1.PrismaRecipientMapper.toPrisma(recipient);
        await this.prisma.recipient.update({
            where: {
                id: recipient.id.toString(),
            },
            data,
        });
    }
    async fetchRecipients(page, perPage) {
        const recipients = await this.prisma.recipient.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return recipients.map(prisma_recipient_mapper_1.PrismaRecipientMapper.toDomain);
    }
    async exists(id) {
        const recipient = await this.findById(id);
        return !!recipient;
    }
};
exports.PrismaRecipientsRepository = PrismaRecipientsRepository;
exports.PrismaRecipientsRepository = PrismaRecipientsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        orders_repository_1.OrdersRepository])
], PrismaRecipientsRepository);
//# sourceMappingURL=prisma-recipients-repository.js.map