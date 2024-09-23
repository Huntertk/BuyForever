import { NextFunction, Request, Response } from "express";
import Product from "../models/productModel";
import type { TypeBaseQuery, TypeNewProductInputPayload, TypeProductQuery, TypeSortQuery } from "../utils/types";
import AppError from "../error/customError";

export const createNewProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const productInputPayload:TypeNewProductInputPayload = req.body
        await Product.create(productInputPayload);
        return res.status(201).json({message:"Product is created"})
    } catch (error) {
        return next(error);
    }
}

export const getAllProducts = async(req:Request, res:Response, next:NextFunction) => {
    try {
       const products = await Product.find();
        return res.status(201).json(products)
    } catch (error) {
        return next(error);
    }
}

export const getProducts = async(req:Request, res:Response, next:NextFunction) => {
    const {search,category, sortby}:TypeProductQuery = req.query;

    const page:number = Number(req.query.page) || 1;
    const limit:number = 10;
    const skip:number = (page - 1) * limit;
    const baseQuery:TypeBaseQuery = {}
    const sort:TypeSortQuery = {};

    if(search){
        baseQuery.title = {
            $regex:search,
            $options:"i"
        }
    }

    if(category){
        baseQuery.category = category
    }

    if(sortby === 'low'){
        sort.price = 1
    }
    if(sortby === 'high'){
        sort.price = -1
    }

    if(sortby === 'asc'){
        sort.title = 1
    }
    if(sortby === 'desc'){
        sort.title = -1
    }
    console.log(sort);
    
        
    try{
        const products = await Product.find(baseQuery)
        .limit(limit)
        .skip(skip)
        .sort(sort);

        const filteredProducts = await Product.find(baseQuery);

        const totalPage = Math.ceil(filteredProducts.length / limit);

        return res.status(200).json({
            success:true,
            totalPage,
            products
        })
    } catch (error) {
        return next(error);
    }
}

export const getProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
       const product = await Product.findById(req.params.id);
       if(!product){
        return next(new AppError("Product not found", 404))
       }
        return res.status(201).json(product)
    } catch (error) {
        return next(error);
    }
}

export const updateProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const updateProductInputPayload:TypeNewProductInputPayload = req.body;
       const product = await Product.findById(req.body.id);
       if(!product){
        return next(new AppError("Product not found", 404))
       }
        if(updateProductInputPayload.title){
            product.title = updateProductInputPayload.title
        }

        if(updateProductInputPayload.description){
            product.description = updateProductInputPayload.description
        }

        if(updateProductInputPayload.isFeatured){
            product.isFeatured = updateProductInputPayload.isFeatured
        }

        if(updateProductInputPayload.price){
            product.price = updateProductInputPayload.price
        }

        if(updateProductInputPayload.stock){
            product.stock += updateProductInputPayload.stock
        }

        if(updateProductInputPayload.category){
            product.category = updateProductInputPayload.category
        }

        await product.save();
        return res.status(201).json({message:"Product is updated"})
    } catch (error) {
        return next(error);
    }
}

export const deleteProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const deleteProductInputPayload:{productId:string} = req.body;
       const product = await Product.findById(deleteProductInputPayload.productId);
       if(!product){
        return next(new AppError("Product not found", 404))
       }
        await product.deleteOne();
        return res.status(201).json({message:"Product is deleted"})
    } catch (error) {
        return next(error);
    }
}