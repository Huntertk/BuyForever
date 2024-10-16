import { NextFunction, Request, Response } from "express";
import Order, { type TypeOrder } from "../models/orderModel";
import AppError from "../error/customError";

export const createOrderByCOD = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let createOrderInputPayload:TypeOrder = req.body;

        if(!createOrderInputPayload.shippingInfo){
            return next(new AppError("Please Provide Shipping Info", 400))
        }
        if(createOrderInputPayload.orderItems.length < 1){
            return next(new AppError("Please Provide Order Item", 400))
        }
        if(!createOrderInputPayload.itemsPrice || !createOrderInputPayload.totalAmount){
            return next(new AppError("Please Provide Items And Total Price", 400))
        }

        if(createOrderInputPayload.paymentMethod !== 'COD'){
            return next(new AppError("Selecting Wrong Payment Method", 400))
        }
        createOrderInputPayload.paymentStatus = "pending"
        createOrderInputPayload.userId = req.userId;
        await Order.create(createOrderInputPayload);
        return res.status(201).json({message:"Order Created Successfully"})

    } catch (error) {
        return next(error);
    }
}