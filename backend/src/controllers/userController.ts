import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
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
        if(updateMePayload.email && updateMePayload.email !== user.email ){
            const isUserAvailable = await User.findOne({email:updateMePayload.email})
            if(isUserAvailable){
                return next(new AppError("User already register with this email", 400))
            }
            user.email = updateMePayload.email
        }
        await user.save();
        return res.status(200).json({message:"user updated successfully"});
    } catch (error) {
        return next(error)
    }
}


export const updateMyPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updateMyPasswordPayload:TypeUpdateMyPasswordInputPayload = req.body;

        const user = await User.findById(req.userId).select("+password");
        if(!user){
            return next(new AppError("User not available", 404))
        }
        
        const isMatchPassword = await bcrypt.compare(updateMyPasswordPayload.currentPassword, user.password)
        
        if(!isMatchPassword){
            return next(new AppError("Please provide current password correctly", 400))
        }
        
        user.password = updateMyPasswordPayload.newPassword
        await user.save();
        return res.status(200).json({message:"user password updated successfully"});
    } catch (error) {
        return next(error)
    }
}