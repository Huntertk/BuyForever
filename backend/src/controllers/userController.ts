import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import AppError from "../error/customError";

export const getAllUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return next(error)
    }
}

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.findById(req.query.id);
        if(!user){
            return next(new AppError("User not Found", 404))
        }
        return res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}

export const getMe = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.findById(req.userId);
        return res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}