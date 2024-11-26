"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getMyOrders = exports.getOrderDetails = exports.getAllOrders = exports.createOrderByCOD = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const customError_1 = __importDefault(require("../error/customError"));
const productModel_1 = __importDefault(require("../models/productModel"));
const createOrderByCOD = async (req, res, next) => {
    try {
        let createOrderInputPayload = req.body;
        if (!createOrderInputPayload.shippingInfo) {
            return next(new customError_1.default("Please Provide Shipping Info", 400));
        }
        if (createOrderInputPayload.orderItems.length < 1) {
            return next(new customError_1.default("Please Provide Order Item", 400));
        }
        if (createOrderInputPayload.paymentMethod !== 'COD') {
            return next(new customError_1.default("Selecting Wrong Payment Method", 400));
        }
        for (let i = 0; i < createOrderInputPayload.orderItems.length; i++) {
            const product = await productModel_1.default.findById(createOrderInputPayload.orderItems[i].productId);
            if (!product) {
                return next(new customError_1.default("Product not found", 404));
            }
            if (product.stock < createOrderInputPayload.orderItems[i].quantity) {
                return next(new customError_1.default("Stock not available", 400));
            }
            product.stock = product.stock - createOrderInputPayload.orderItems[i].quantity;
            await product.save();
        }
        const itemsPrice = createOrderInputPayload.orderItems.reduce((accumulator, item) => (accumulator + item.price * item.quantity), 0);
        const shippingPrice = itemsPrice > 2000 ? 0 : 25;
        const totalAmount = Number((itemsPrice + shippingPrice).toFixed(2));
        createOrderInputPayload.shippingAmount = shippingPrice;
        createOrderInputPayload.totalAmount = totalAmount;
        createOrderInputPayload.itemsPrice = itemsPrice;
        createOrderInputPayload.paymentStatus = "pending";
        createOrderInputPayload.userId = req.userId;
        await orderModel_1.default.create(createOrderInputPayload);
        return res.status(201).json({ message: "Order Created Successfully" });
    }
    catch (error) {
        return next(error);
    }
};
exports.createOrderByCOD = createOrderByCOD;
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel_1.default.find();
        return res.status(200).json(orders);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderDetails = async (req, res, next) => {
    try {
        if (!req.query.orderId) {
            return next(new customError_1.default("Order id not found", 404));
        }
        const order = await orderModel_1.default.findById(req.query.orderId).populate({
            path: 'userId',
            select: "name email"
        });
        if (!order) {
            return next(new customError_1.default("Order not found", 404));
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return next(error);
    }
};
exports.getOrderDetails = getOrderDetails;
const getMyOrders = async (req, res, next) => {
    try {
        const order = await orderModel_1.default.find({ userId: req.userId });
        if (order.length < 1) {
            return next(new customError_1.default("Order not found", 404));
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return next(error);
    }
};
exports.getMyOrders = getMyOrders;
const updateOrder = async (req, res, next) => {
    try {
        const updateOrderInputPayload = req.body;
        if (!updateOrderInputPayload.orderId) {
            return next(new customError_1.default("Order Id not found", 404));
        }
        if (updateOrderInputPayload.orderStatus === 'Cancelled') {
            if (!updateOrderInputPayload.orderRemarks) {
                return next(new customError_1.default("Please write a remarks for cancelling order", 404));
            }
        }
        const order = await orderModel_1.default.findById(updateOrderInputPayload.orderId);
        if (!order) {
            return next(new customError_1.default("Order not found", 404));
        }
        if (order.orderStatus === 'Delivered') {
            return next(new customError_1.default("Order already delivered", 400));
        }
        if (order.orderStatus === 'Cancelled') {
            return next(new customError_1.default("Order already cancelled", 400));
        }
        if (updateOrderInputPayload.orderStatus === 'Cancelled') {
            for (let i = 0; i < order.orderItems.length; i++) {
                const product = await productModel_1.default.findById(order.orderItems[i].productId);
                if (!product) {
                    return next(new customError_1.default("Product not found with this id", 404));
                }
                product.stock = product.stock + order.orderItems[i].quantity;
                await product.save();
            }
            if (req.body.orderRemarks) {
                order.orderRemarks = updateOrderInputPayload.orderRemarks;
            }
        }
        if (updateOrderInputPayload.orderStatus === 'Delivered') {
            if (!updateOrderInputPayload.paymentStatus) {
                return next(new customError_1.default("Please provide payment status", 400));
            }
            order.deliverdAt = new Date(Date.now());
            order.orderRemarks = "Delivered";
        }
        if (req.body.paymentStatus) {
            order.paymentStatus = updateOrderInputPayload.paymentStatus;
        }
        order.orderStatus = updateOrderInputPayload.orderStatus;
        await order.save();
        return res.status(200).json("Order Updated Successfully");
    }
    catch (error) {
        return next(error);
    }
};
exports.updateOrder = updateOrder;
