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
exports.NodemailerSendEmailToUser = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const env_service_1 = require("../env/env.service");
let NodemailerSendEmailToUser = class NodemailerSendEmailToUser {
    constructor(envService) {
        this.envService = envService;
        this.transporter = nodemailer.createTransport({
            host: envService.get('SMTP_HOST'),
            port: Number(envService.get('SMTP_PORT')),
            secure: false,
            auth: {
                user: envService.get('SMTP_USER'),
                pass: envService.get('SMTP_PASS'),
            },
        });
    }
    async send(data) {
        try {
            const isShouldTest = this.envService.get('NODE_ENV') === 'test';
            if (isShouldTest) {
                return;
            }
            await this.transporter.sendMail({
                from: this.envService.get('SMTP_USER'),
                to: data.to.email,
                subject: data.to.subject,
                text: data.to.body,
            });
        }
        catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        }
    }
};
exports.NodemailerSendEmailToUser = NodemailerSendEmailToUser;
exports.NodemailerSendEmailToUser = NodemailerSendEmailToUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], NodemailerSendEmailToUser);
//# sourceMappingURL=node-mailer-send-email.service.js.map