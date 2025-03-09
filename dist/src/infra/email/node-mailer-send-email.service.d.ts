import { FormatSendEmailUser, SendEmailToUser } from '@/domain/notification/application/email/send-email';
import { EnvService } from '../env/env.service';
export declare class NodemailerSendEmailToUser implements SendEmailToUser {
    private readonly envService;
    private transporter;
    constructor(envService: EnvService);
    send(data: FormatSendEmailUser): Promise<void>;
}
