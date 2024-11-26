"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationResponse = void 0;
const express_validator_1 = require("express-validator");
const customError_1 = __importDefault(require("../error/customError"));
const validationResponse = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return next(new customError_1.default(errorMessages[0], 400));
    }
    next();
};
exports.validationResponse = validationResponse;
