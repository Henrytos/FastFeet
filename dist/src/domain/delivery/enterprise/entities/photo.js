"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Photo extends entity_1.Entity {
    get url() {
        return this.props.url;
    }
    set url(url) {
        this.props.url = url;
    }
    get fileName() {
        return this.props.fileName;
    }
    set fileName(fileName) {
        this.props.fileName = fileName;
    }
    static create(props, id) {
        const photo = new Photo({
            ...props,
        }, id);
        return photo;
    }
}
exports.Photo = Photo;
//# sourceMappingURL=photo.js.map