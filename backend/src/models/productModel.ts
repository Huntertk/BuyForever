import mongoose from "mongoose";

type TypeProduct = {
    _id:string;
    title:string;
    description:string;
    images:[string],
    category:string;
    price:number;
    stock:number;
    isFeatured:boolean;
}

const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  images:[String],
  description:{
    type:String,
    required: true
  },
  category:{
    type:String,
    required: true
  },
  price:{
    type:Number,
    required: true
  },
  stock:{
    type:Number,
    required: true
  },
  isFeatured:{
    type:Boolean,
    default: false
  },

},{timestamps:true});


const Product = mongoose.model<TypeProduct>('Product', productSchema);

export default Product;