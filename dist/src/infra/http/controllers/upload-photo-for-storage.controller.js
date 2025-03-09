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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadPhotoForStorageController = void 0;
const wrong_credentials_error_1 = require("../../../domain/delivery/application/use-cases/errors/wrong-credentials-error");
const upload_and_create_photo_use_case_1 = require("../../../domain/delivery/application/use-cases/upload-and-create-photo-use-case");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const use_roles_guards_decorator_1 = require("../guards/use-roles-guards.decorator");
const swagger_1 = require("@nestjs/swagger");
const format_token_dto_1 = require("../dtos/format-token.dto");
let UploadPhotoForStorageController = class UploadPhotoForStorageController {
    constructor(uploadPhotoForStorageUseCase) {
        this.uploadPhotoForStorageUseCase = uploadPhotoForStorageUseCase;
    }
    async handler(file) {
        const result = await this.uploadPhotoForStorageUseCase.execute({
            fileName: file.originalname,
            fileType: file.mimetype,
            photo: file.buffer,
        });
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.BadRequestException(result.value.message);
                default:
                    throw new common_1.InternalServerErrorException();
            }
        }
        return {
            photoUrl: result.value.url,
        };
    }
};
exports.UploadPhotoForStorageController = UploadPhotoForStorageController;
__decorate([
    (0, common_1.Post)('/photo'),
    (0, use_roles_guards_decorator_1.UseRolesGuards)('DELIVERY_MAN'),
    (0, swagger_1.ApiHeader)(format_token_dto_1.FORMAT_TOKEN_DTO),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                photoUrl: {
                    type: 'string',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadPhotoForStorageController.prototype, "handler", null);
exports.UploadPhotoForStorageController = UploadPhotoForStorageController = __decorate([
    (0, common_1.Controller)('/upload'),
    (0, swagger_1.ApiTags)('photo'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [upload_and_create_photo_use_case_1.UploadPhotoForStorageUseCase])
], UploadPhotoForStorageController);
//# sourceMappingURL=upload-photo-for-storage.controller.js.map