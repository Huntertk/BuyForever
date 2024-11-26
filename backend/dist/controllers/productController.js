"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.getAllProducts = exports.createNewProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const customError_1 = __importDefault(require("../error/customError"));
const crypto_1 = __importDefault(require("crypto"));
const createNewProduct = async (req, res, next) => {
    try {
        const productInputPayload = req.body;
        const uniqueId = crypto_1.default.randomUUID();
        productInputPayload.uniqueId = uniqueId;
        await productModel_1.default.create(productInputPayload);
        return res.status(201).json({ message: "Product is created" });
    }
    catch (error) {
        return next(error);
    }
};
exports.createNewProduct = createNewProduct;
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel_1.default.find();
        return res.status(201).json(products);
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllProducts = getAllProducts;
const getProducts = async (req, res, next) => {
    const { search, category, sortby, subcategory, featured, fields } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    let sort = "-createdAt";
    let fieldsQuery = "-__v";
    if (search) {
        baseQuery.title = {
            $regex: search,
            $options: "i"
        };
    }
    if (subcategory) {
        baseQuery.subCategory = subcategory;
    }
    if (category) {
        baseQuery.category = category;
    }
    if (featured) {
        baseQuery.isFeatured = featured;
    }
    if (sortby) {
        sort = sortby;
    }
    if (fields) {
        const formatField = fields.split(',').join(' ');
        fieldsQuery = formatField;
    }
    try {
        const products = await productModel_1.default.find(baseQuery)
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .select(fieldsQuery);
        const filteredProducts = await productModel_1.default.find(baseQuery);
        const totalPage = Math.ceil(filteredProducts.length / limit);
        return res.status(200).json({
            success: true,
            totalPage,
            totalResult: products.length,
            products
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getProducts = getProducts;
const getProduct = async (req, res, next) => {
    try {
        const product = await productModel_1.default.findOne({ uniqueId: req.params.id });
        if (!product) {
            return next(new customError_1.default("Product not found", 404));
        }
        return res.status(201).json(product);
    }
    catch (error) {
        return next(error);
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res, next) => {
    try {
        const updateProductInputPayload = req.body;
        const product = await productModel_1.default.findById(req.body.id);
        if (!product) {
            return next(new customError_1.default("Product not found", 404));
        }
        if (updateProductInputPayload.title) {
            product.title = updateProductInputPayload.title;
        }
        if (updateProductInputPayload.description) {
            product.description = updateProductInputPayload.description;
        }
        if (updateProductInputPayload.isFeatured) {
            product.isFeatured = updateProductInputPayload.isFeatured;
        }
        if (updateProductInputPayload.price) {
            product.price = updateProductInputPayload.price;
        }
        if (updateProductInputPayload.stock) {
            product.stock += updateProductInputPayload.stock;
        }
        if (updateProductInputPayload.category) {
            product.category = updateProductInputPayload.category;
        }
        await product.save();
        return res.status(201).json({ message: "Product is updated" });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const deleteProductInputPayload = req.body;
        const product = await productModel_1.default.findById(deleteProductInputPayload.productId);
        if (!product) {
            return next(new customError_1.default("Product not found", 404));
        }
        await product.deleteOne();
        return res.status(201).json({ message: "Product is deleted" });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteProduct = deleteProduct;
