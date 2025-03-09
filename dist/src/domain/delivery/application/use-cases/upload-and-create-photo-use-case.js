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
exports.UploadPhotoForStorageUseCase = void 0;
const either_1 = require("../../../../core/either");
const uploader_1 = require("../storage/uploader");
const photo_1 = require("../../enterprise/entities/photo");
const photos_repository_1 = require("../repositories/photos-repository");
const wrong_credentials_error_1 = require("./errors/wrong-credentials-error");
const common_1 = require("@nestjs/common");
let UploadPhotoForStorageUseCase = class UploadPhotoForStorageUseCase {
    constructor(uploader, photosRepository) {
        this.uploader = uploader;
        this.photosRepository = photosRepository;
    }
    async execute({ photo, fileName, fileType, }) {
        if (this.isInValidFiletypeOfPhoto(fileType)) {
            return (0, either_1.left)(new wrong_credentials_error_1.WrongCredentialsError());
        }
        const { url } = await this.uploader.upload({
            fileName,
            fileType,
            body: photo,
        });
        const newPhoto = photo_1.Photo.create({ url, fileName });
        await this.photosRepository.create(newPhoto);
        return (0, either_1.right)({ url });
    }
    isInValidFiletypeOfPhoto(fileType) {
        return !/^image\/(jpg|jpeg|png)$/.test(fileType);
    }
};
exports.UploadPhotoForStorageUseCase = UploadPhotoForStorageUseCase;
exports.UploadPhotoForStorageUseCase = UploadPhotoForStorageUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [uploader_1.Uploader,
        photos_repository_1.PhotosRepository])
], UploadPhotoForStorageUseCase);
//# sourceMappingURL=upload-and-create-photo-use-case.js.map