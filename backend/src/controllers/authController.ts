import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import type {TypeLoginInputPayload, TypeRegisterInputPayload} from '../utils/types';
import AppError from "../error/customError";
import { generateJsonWebToken } from "../utils/jwt";
import bcrypt from  'bcryptjs';

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
        
        res.cookie('auth_token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:1000*60*60*24*1
        })
        return res.status(201).json({message:"User register successfully", success:true})
    } catch (error) {
        return next(error);
    }
}


export const login = async (req:Request, res:Response, next:NextFunction) => {
    const loginInputPayload:TypeLoginInputPayload = req.body;
    try {
        const user = await User.findOne({email:loginInputPayload.email}).select("+password")
        if(!user){
            return next(new AppError("Wrong Credentials", 400))
        }
        
        const comparePassword = await bcrypt.compare(loginInputPayload.password, user.password);
        if(!comparePassword){
            return next(new AppError("Wrong Credentials", 400))
        }

        const token = generateJsonWebToken(user._id);
        
        res.cookie('auth_token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:1000*60*60*24*1
        })
        return res.status(200).json({message:"User login successfully", success:true})
    } catch (error) {
        return next(error);
    }
}


export const logout = async (req:Request, res:Response, next:NextFunction) => {
    try {
        res.cookie('auth_token', "", {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:0
        });
        return res.status(200).json({message:"User logout successfully", success:true})
    } catch (error) {
        return next(error);
    }
}