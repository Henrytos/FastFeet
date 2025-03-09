"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRolesGuards = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const roles_guards_1 = require("./roles.guards");
exports.ROLES_KEY = 'roles';
const UseRolesGuards = (...roles) => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(roles_guards_1.RolesGuards), (0, common_1.SetMetadata)('roles', roles));
};
exports.UseRolesGuards = UseRolesGuards;
//# sourceMappingURL=use-roles-guards.decorator.js.map