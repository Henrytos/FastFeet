"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoDoesNotExistError = void 0;
class PhotoDoesNotExistError extends Error {
    constructor() {
        super();
        this.message = 'Photo does not exist';
    }
}
exports.PhotoDoesNotExistError = PhotoDoesNotExistError;
//# sourceMappingURL=photo-does-not-exist-error.js.map