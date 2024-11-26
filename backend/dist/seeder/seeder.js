"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const productModel_1 = __importDefault(require("../models/productModel"));
const importData = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_URI);
        const data = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'data.json'), 'utf-8'));
        await productModel_1.default.deleteMany();
        console.log("All Product Deleted");
        data.forEach(async (item) => {
            const newProduct = new productModel_1.default(item);
            newProduct.uniqueId = crypto_1.default.randomUUID();
            await newProduct.save();
        });
        // await Product.create(JSON.parse(data));
        console.log("All Product Added");
    }
    catch (error) {
        console.log(error);
    }
};
// Importing Data
importData();
// const updatingProduct = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URI as string)
//         await Product.updateMany({category:'Women'},{category:'women'})
//         console.log("All Product Updated");
//     } catch (error) {
//         console.log(error);
//     }
// }
// updatingProduct()
