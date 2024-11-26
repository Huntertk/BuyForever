"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../error/customError"));
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }
    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    };
    //Handle Invalid Mongoose Id
    if (err.name === "CastError") {
        const message = `Resource not found Invalid`;
        error = new customError_1.default(message, 404);
    }
    //Handle JSON TOKEN Error
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid Token, Please login again`;
        error = new customError_1.default(message, 401);
    }
    //Handle JSON TOKEN EXPIRE Error
    if (err.name === "TokenExpiredError") {
        const message = `Token Expired, Please login again`;
        error = new customError_1.default(message, 401);
    }
    return res.status(error.statusCode).json(error.message);
};
exports.default = errorHandler;
