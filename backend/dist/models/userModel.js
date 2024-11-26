"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
