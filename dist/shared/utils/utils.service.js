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
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
let UtilsService = class UtilsService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async hashPassword(password) {
        try {
            if (!password)
                throw new common_1.BadRequestException("Password is required.");
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        }
        catch (err) {
            throw new Error('Error hashing password: ' + err.message);
        }
    }
    ;
    async validatePassword(password, user) {
        try {
            if (!password)
                throw new common_1.BadRequestException("Password is required.");
            const validPassword = await bcrypt.compare(password, user.password);
            return validPassword;
        }
        catch (err) {
            throw new Error('Error validating password: ' + err.message);
        }
    }
    ;
    async emailIsTaken(email) {
        const user = await this.userModel.findOne({ email: email }).exec();
        return user !== null;
    }
    ;
};
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UtilsService);
//# sourceMappingURL=utils.service.js.map