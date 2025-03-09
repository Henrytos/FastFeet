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
exports.R2StorageUploader = void 0;
const env_service_1 = require("../env/env.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let R2StorageUploader = class R2StorageUploader {
    constructor(envService) {
        this.envService = envService;
        const accountId = envService.get('CLOUDFLARE_ACCOUNT_ID');
        const accessKeyId = envService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = envService.get('AWS_SECRET_ACCESS_KEY');
        this.client = new client_s3_1.S3Client({
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            region: 'auto',
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }
    async upload({ fileName, fileType, body, }) {
        const uploadId = (0, crypto_1.randomUUID)();
        const uniqueFileName = `${uploadId}-${fileName}`;
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.envService.get('AWS_BUCKET_NAME'),
            Key: uniqueFileName,
            ContentType: fileType,
            Body: body,
        }));
        const domainImages = this.envService.get('AWS_DOMAIN_ATTACHMENT');
        const imageUrl = `${domainImages}/${uniqueFileName}`;
        return { url: imageUrl };
    }
};
exports.R2StorageUploader = R2StorageUploader;
exports.R2StorageUploader = R2StorageUploader = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], R2StorageUploader);
//# sourceMappingURL=r2-storage-uploader.service.js.map