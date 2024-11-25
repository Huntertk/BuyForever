import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Product from '../models/productModel';

const importData = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)

        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
        
        await Product.deleteMany()
        console.log("All Product Deleted");
        data.forEach(async (item:any) => {
            const newProduct =  new Product(item);
            newProduct.uniqueId = crypto.randomUUID();
            await newProduct.save();
        })
        // await Product.create(JSON.parse(data));
        console.log("All Product Added");
        
    } catch (error) {
        console.log(error);
        
    }
}


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

