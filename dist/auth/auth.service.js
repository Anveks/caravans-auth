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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const user_type_enum_1 = require("../shared/enums/user_type.enum");
const utils_service_1 = require("../shared/utils/utils.service");
let AuthService = class AuthService {
    constructor(userModel, utilsService) {
        this.userModel = userModel;
        this.utilsService = utilsService;
        this.SECRET_KEY = 'secret';
    }
    async register(name, email, password, address) {
        try {
            const emalIsTaken = await this.utilsService.emailIsTaken(email);
            if (emalIsTaken)
                throw new common_1.BadRequestException("Email is already taken");
            const hashedPassword = await this.utilsService.hashPassword(password);
            const newUser = new this.userModel({
                _id: new mongoose_2.default.Types.ObjectId(),
                name: name,
                email: email,
                password: password,
                address: address,
                type: user_type_enum_1.UserType.USER
            });
            newUser.password = hashedPassword;
            const result = await newUser.save();
            return result;
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException)
                throw err;
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async login(email, password) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            console.log(user);
            if (!user) {
                throw new common_1.NotFoundException("User does not exist.");
            }
            const passwordIsValid = await this.utilsService.validatePassword(password, user);
            if (!passwordIsValid) {
                throw new common_1.BadRequestException("Invalid password.");
            }
            const token = jwt.sign({
                user: {
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                    type: user.type,
                }
            }, this.SECRET_KEY, { expiresIn: "1h" });
            return token;
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException)
                throw err;
            throw new common_1.InternalServerErrorException("Error while logging in.");
        }
    }
    async logout() {
        return { "success": true, "message": "Logout successful" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        utils_service_1.UtilsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map