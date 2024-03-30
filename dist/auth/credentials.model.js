"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsSchema = void 0;
const mongoose = require("mongoose");
exports.CredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
    },
});
//# sourceMappingURL=credentials.model.js.map