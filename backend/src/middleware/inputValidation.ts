import { NextFunction, Request, Response } from "express";
import { z } from "zod";
// import AppError from "../error/customError";

export const validateRegiterInput = async (req:Request, res:Response, next:NextFunction) => {

    const requestBody = z.object({
        name:z.string().max(50).trim(),
        password:z.string().min(8),
        email:z.string().email(),
    })
    const requestBodyDataWithSuccess = requestBody.safeParse(req.body);
    if(!requestBodyDataWithSuccess.success){
        console.log(requestBodyDataWithSuccess.error.message[0]);
        return res.json(requestBodyDataWithSuccess.error.issues)
        // return next(new AppError("Opps", 403));
    }
}