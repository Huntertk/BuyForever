import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import AppError from "../error/customError";
import type { TypeUpdateMeInputPayload, TypeUpdateMyPasswordInputPayload } from "../utils/types";

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
        if(!user){
            return next(new AppError("User not available", 404))
        }
        return res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}

export const updateMe = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updateMePayload:TypeUpdateMeInputPayload = req.body;

        const user = await User.findById(req.userId);
        if(!user){
            return next(new AppError("User not available", 404))
        }

        if(updateMePayload.name){
            user.name = updateMePayload.name
        }
        if(updateMePayload.email){
            const isUserAvailable = await User.findOne({email:updateMePayload.email})
            if(isUserAvailable){
                return next(new AppError("User already register with this email", 400))
            }
            user.email = updateMePayload.email
        }
        await user.save();
        return res.status(200).json("user updated successfully");
    } catch (error) {
        return next(error)
    }
}


export const updateMyPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updateMYPasswordPayload:TypeUpdateMyPasswordInputPayload = req.body;

        const user = await User.findById(req.userId);
        if(!user){
            return next(new AppError("User not available", 404))
        }
        
        if(updateMYPasswordPayload.password){
            user.password = updateMYPasswordPayload.password
        }
        await user.save();
        return res.status(200).json("user password updated successfully");
    } catch (error) {
        return next(error)
    }
}