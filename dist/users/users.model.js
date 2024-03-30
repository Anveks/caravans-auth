"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const user_type_enum_1 = require("../shared/enums/user_type.enum");
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
exports.UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validation: [validatePassword, 'Invalid password.']
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: user_type_enum_1.UserType,
        required: true,
        default: user_type_enum_1.UserType.USER
    }
});
//# sourceMappingURL=users.model.js.map