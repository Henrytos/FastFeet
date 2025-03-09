"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPhotoMapper = void 0;
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
const photo_1 = require("../../../../domain/delivery/enterprise/entities/photo");
class PrismaPhotoMapper {
    static toDomain(raw) {
        return photo_1.Photo.create({
            fileName: raw.filename,
            url: raw.url,
        }, new unique_entity_id_1.UniqueEntityID(raw.id));
    }
    static toPrisma(photo) {
        return {
            id: photo.id.toString(),
            filename: photo.fileName,
            url: photo.url,
        };
    }
}
exports.PrismaPhotoMapper = PrismaPhotoMapper;
//# sourceMappingURL=prisma-photo-mapper.js.map