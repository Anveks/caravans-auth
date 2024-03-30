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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_service_1 = require("../shared/utils/utils.service");
let UsersService = class UsersService {
    constructor(userModel, utilsService) {
        this.userModel = userModel;
        this.utilsService = utilsService;
    }
    async getAllUsers() {
        let users = [];
        try {
            users = await this.userModel.find();
            return users;
        }
        catch (err) {
            if (users.length === 0)
                throw new common_1.InternalServerErrorException("Error while fetching the users.");
        }
    }
    ;
    async getCurrentUser(id) {
        let currentUser;
        try {
            currentUser = await this.userModel.findById(id).exec();
            console.log(currentUser);
            return currentUser;
        }
        catch (err) {
            if (!currentUser)
                throw new common_1.InternalServerErrorException("Error while fetching the user data.");
        }
    }
    async updatePassword(id, password) {
        try {
            const newHashedPassword = await this.utilsService.hashPassword(password);
            await this.userModel.updateOne({ _id: id }, { $set: { password: newHashedPassword } });
            return { "success": true, "message": "Password update successful" };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException("Error while updating the password.");
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        utils_service_1.UtilsService])
], UsersService);
//# sourceMappingURL=users.service.js.map