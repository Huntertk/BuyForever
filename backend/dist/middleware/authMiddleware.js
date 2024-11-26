"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("../error/customError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authUser = async (req, res, next) => {
    try {
        const { auth_token } = req.cookies;
        if (!auth_token) {
            return next(new customError_1.default("Unauthenticated", 401));
        }
        const decoded = jsonwebtoken_1.default.verify(auth_token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new customError_1.default("Unauthenticated", 401));
        }
        const userId = decoded.userId;
        req.userId = userId;
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.authUser = authUser;
//Authorized Roles
const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        const user = await userModel_1.default.findById(req.userId);
        if (user) {
            if (!roles.includes(user.role)) {
                return next(new customError_1.default('You do not have permission to perform this action', 403));
            }
            return next();
        }
        return next(new customError_1.default('You do not have permission to perform this action', 403));
    };
};
exports.authorizeRoles = authorizeRoles;
