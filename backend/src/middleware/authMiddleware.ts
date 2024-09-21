import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/customError";
import User from "../models/userModel";

declare global {
    namespace Express {
      interface Request {
        userId:string;
      }
    }
  }

export const authUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {auth_token} = req.cookies;
        if(!auth_token){
            return next(new AppError("Unauthenticated", 401))
        }
        const decoded =  jwt.verify(auth_token, process.env.JWT_SECRET as string)
        if(!decoded){
            return next(new AppError("Unauthenticated", 401))
        }
        const userId = (decoded as JwtPayload).userId
        req.userId = userId;
        next();
    } catch (error) {
        return next(error)
    }
}

//Authorized Roles
export const authorizeRoles = (...roles:string[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {
      const user = await User.findById(req.userId);
        if(user){
          if(!roles.includes(user.role)){
            return next(new AppError('You do not have permission to perform this action', 403))
          }
          return next();
        }
        return next(new AppError('You do not have permission to perform this action', 403))
    }
}