"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const env_module_1 = require("../../env/env.module");
const uploader_1 = require("../../../domain/delivery/application/storage/uploader");
const r2_storage_uploader_service_1 = require("./r2-storage-uploader.service");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Module)({
        imports: [env_module_1.EnvModule],
        providers: [{ provide: uploader_1.Uploader, useClass: r2_storage_uploader_service_1.R2StorageUploader }],
        exports: [
            {
                provide: uploader_1.Uploader,
                useClass: r2_storage_uploader_service_1.R2StorageUploader,
            },
        ],
    })
], StorageModule);
//# sourceMappingURL=storage.module.js.map