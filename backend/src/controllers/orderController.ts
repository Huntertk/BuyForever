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

export const getAllOrders = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders);
    } catch (error) {
        return next(error)
    }
} 

export const getOrderDetails = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if(!req.query.orderId){
            return next(new AppError("Order id not found", 404));

        }
        const order = await Order.findById(req.query.orderId).populate({
            path:'userId',
            select:"name email"
        })
        if(!order){
            return next(new AppError("Order not found", 404));
        }

        return res.status(200).json(order);
    } catch (error) {
        return next(error)
    }
} 


export const getMyOrders = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const order = await Order.find({userId:req.userId})
        if(order.length < 1){
            return next(new AppError("Order not found", 404));
        }

        return res.status(200).json(order);
    } catch (error) {
        return next(error)
    }
} 