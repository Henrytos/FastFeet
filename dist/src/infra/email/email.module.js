"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const node_mailer_send_email_service_1 = require("./node-mailer-send-email.service");
const env_module_1 = require("../env/env.module");
const send_email_1 = require("../../domain/notification/application/email/send-email");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [env_module_1.EnvModule],
        providers: [
            {
                provide: send_email_1.SendEmailToUser,
                useClass: node_mailer_send_email_service_1.NodemailerSendEmailToUser,
            },
        ],
        exports: [send_email_1.SendEmailToUser],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map