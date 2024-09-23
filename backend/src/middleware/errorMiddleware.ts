import {NextFunction, Request, Response} from 'express';
import AppError from '../error/customError';

const errorHandler  = (err:AppError, req:Request, res:Response, next:NextFunction) => {
    if(process.env.NODE_ENV === 'development'){
        console.log(err);
    }

    let error = {
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    }
      //Handle Invalid Mongoose Id
      if(err.name === "CastError"){
        const message = `Resource not found Invalid`
        error = new AppError(message, 404)
    }
     
        //Handle JSON TOKEN Error
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid Token, Please login again`
        error = new AppError(message, 401)
    }

    //Handle JSON TOKEN EXPIRE Error
    if(err.name === "TokenExpiredError"){
        const message = `Token Expired, Please login again`
        error = new AppError(message, 401)
    }
     
    return res.status(error.statusCode).json(error.message);
};
  
export default errorHandler;