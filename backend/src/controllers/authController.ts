import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import type {TypeRegisterInputPayload} from '../utils/types';
import AppError from "../error/customError";
import { generateJsonWebToken } from "../utils/generateJWT";

export const register = async (req:Request, res:Response, next:NextFunction) => {
    const registerInputPayload:TypeRegisterInputPayload = req.body;
    try {
        const isUserExist = await User.findOne({email:registerInputPayload.email})
        if(isUserExist){
            return next(new AppError("User Already Exist", 400))
        }
        req.body.role = "user"
        const newUser = await User.create(registerInputPayload);
        const token = generateJsonWebToken(newUser._id);
        
        res.cookie('auth-token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:1000*60*60*24*1
        })
        return res.status(201).json({message:"User register successfully", success:true})
    } catch (error) {
        return next(error);
    }
}