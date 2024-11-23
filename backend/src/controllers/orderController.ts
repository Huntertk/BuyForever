import { NextFunction, Request, Response } from "express";
import Order, { type TypeOrder } from "../models/orderModel";
import AppError from "../error/customError";
import { type TypeUpdateOrder } from "../utils/types";
import Product from "../models/productModel";

export const createOrderByCOD = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let createOrderInputPayload:TypeOrder = req.body;

        if(!createOrderInputPayload.shippingInfo){
            return next(new AppError("Please Provide Shipping Info", 400))
        }
        if(createOrderInputPayload.orderItems.length < 1){
            return next(new AppError("Please Provide Order Item", 400))
        }
        // if(!createOrderInputPayload.itemsPrice || !createOrderInputPayload.totalAmount){
        //     return next(new AppError("Please Provide Items And Total Price", 400))
        // }

        if(createOrderInputPayload.paymentMethod !== 'COD'){
            return next(new AppError("Selecting Wrong Payment Method", 400))
        }


        for (let i = 0; i < createOrderInputPayload.orderItems.length; i++) {
            const product = await Product.findById(createOrderInputPayload.orderItems[i].productId);
            
            if(!product){
                return next(new AppError("Product not found", 404))
            } 
            if(product.stock < createOrderInputPayload.orderItems[i].quantity){
                return next(new AppError("Stock not available", 400))
            }
            product.stock = product.stock - createOrderInputPayload.orderItems[i].quantity
            await product.save();
            
        }



        const itemsPrice:number = createOrderInputPayload.orderItems.reduce((accumulator, item) => (
            accumulator + item.price * item.quantity
        ),0)

        const shippingPrice = itemsPrice > 2000 ? 0 : 25;
        const totalAmount = Number((itemsPrice + shippingPrice).toFixed(2));

        createOrderInputPayload.shippingAmount = shippingPrice;
        createOrderInputPayload.totalAmount = totalAmount  
        createOrderInputPayload.itemsPrice = itemsPrice;
        createOrderInputPayload.paymentStatus = "pending";
        createOrderInputPayload.userId = req.userId;
        await Order.create(createOrderInputPayload);
        return res.status(201).json({message:"Order Created Successfully"});

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

export const updateOrder = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updateOrderInputPayload:TypeUpdateOrder = req.body;
        if(!updateOrderInputPayload.orderId){
            return next(new AppError("Order Id not found", 404))
        }
        const order = await Order.findById(updateOrderInputPayload.orderId);
        if(!order){
            return next(new AppError("Order not found", 404))
        }
        if(order.orderStatus === 'Delivered'){
            return next(new AppError("Order already delivered", 400))
        }
        if(order.orderStatus === 'Cancelled'){
            return next(new AppError("Order already cancelled", 400))
        }
        
        if(req.body.paymentStatus){
            order.paymentStatus = updateOrderInputPayload.paymentStatus
        }

        if(req.body.orderRemarks){
            order.orderRemarks = updateOrderInputPayload.orderRemarks
        }

        if(updateOrderInputPayload.orderStatus === 'Delivered'){
            order.deliverdAt = new Date(Date.now());
        }
        order.orderStatus = updateOrderInputPayload.orderStatus
        await order.save();
        return res.status(200).json("Order Updated Successfully");
    } catch (error) {
        return next(error)
    }
}