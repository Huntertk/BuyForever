"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyPassword = exports.updateMe = exports.getMe = exports.getUser = exports.getAllUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const customError_1 = __importDefault(require("../error/customError"));
const getAllUser = async (req, res, next) => {
    try {
        const users = await userModel_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllUser = getAllUser;
const getUser = async (req, res, next) => {
    try {
        const user = await userModel_1.default.findById(req.query.id);
        if (!user) {
            return next(new customError_1.default("User not Found", 404));
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return next(error);
    }
};
exports.getUser = getUser;
const getMe = async (req, res, next) => {
    try {
        const user = await userModel_1.default.findById(req.userId);
        if (!user) {
            return next(new customError_1.default("User not available", 404));
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return next(error);
    }
};
exports.getMe = getMe;
const updateMe = async (req, res, next) => {
    try {
        const updateMePayload = req.body;
        const user = await userModel_1.default.findById(req.userId);
        if (!user) {
            return next(new customError_1.default("User not available", 404));
        }
        if (updateMePayload.name) {
            user.name = updateMePayload.name;
        }
        if (updateMePayload.email) {
            const isUserAvailable = await userModel_1.default.findOne({ email: updateMePayload.email });
            if (isUserAvailable) {
                return next(new customError_1.default("User already register with this email", 400));
            }
            user.email = updateMePayload.email;
        }
        await user.save();
        return res.status(200).json("user updated successfully");
    }
    catch (error) {
        return next(error);
    }
};
exports.updateMe = updateMe;
const updateMyPassword = async (req, res, next) => {
    try {
        const updateMyPasswordPayload = req.body;
        const user = await userModel_1.default.findById(req.userId);
        if (!user) {
            return next(new customError_1.default("User not available", 404));
        }
        if (updateMyPasswordPayload.password) {
            user.password = updateMyPasswordPayload.password;
        }
        await user.save();
        return res.status(200).json("user password updated successfully");
    }
    catch (error) {
        return next(error);
    }
};
exports.updateMyPassword = updateMyPassword;
