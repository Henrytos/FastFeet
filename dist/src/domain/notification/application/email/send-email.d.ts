export interface FormatSendEmailUser {
    to: {
        email: string;
        subject: string;
        body: string;
    };
}
export declare abstract class SendEmailToUser {
    abstract send(data: FormatSendEmailUser): Promise<void>;
}
