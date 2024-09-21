import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import AppError from "../error/customError";

export const validationResponse = async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => error.msg);
        return next(new AppError(errorMessages[0], 400))
    }
    next()
}