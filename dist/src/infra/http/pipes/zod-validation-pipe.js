"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        console.log('--------------------------error--------------------------');
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new Error('Unexpected error occurred while validating input');
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod-validation-pipe.js.map