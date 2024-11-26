"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const customError_1 = __importDefault(require("../error/customError"));
const jwt_1 = require("../utils/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res, next) => {
    const registerInputPayload = req.body;
    try {
        const isUserExist = await userModel_1.default.findOne({ email: registerInputPayload.email });
        if (isUserExist) {
            return next(new customError_1.default("User Already Exist", 400));
        }
        req.body.role = "user";
        const newUser = await userModel_1.default.create(registerInputPayload);
        const token = (0, jwt_1.generateJsonWebToken)(newUser._id);
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 1
        });
        return res.status(201).json({ message: "User register successfully", success: true });
    }
    catch (error) {
        return next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const loginInputPayload = req.body;
    try {
        const user = await userModel_1.default.findOne({ email: loginInputPayload.email }).select("+password");
        if (!user) {
            return next(new customError_1.default("Wrong Credentials", 400));
        }
        const comparePassword = await bcryptjs_1.default.compare(loginInputPayload.password, user.password);
        if (!comparePassword) {
            return next(new customError_1.default("Wrong Credentials", 400));
        }
        const token = (0, jwt_1.generateJsonWebToken)(user._id);
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 1
        });
        return res.status(200).json({ message: "User login successfully", success: true });
    }
    catch (error) {
        return next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.cookie('auth_token', "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
        return res.status(200).json({ message: "User logout successfully", success: true });
    }
    catch (error) {
        return next(error);
    }
};
exports.logout = logout;
