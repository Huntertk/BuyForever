import mongoose from "mongoose";

type TypeProduct = {
    _id:string;
    title:string;
    description:string;
    images:[string],
    category:string;
    subCategory:string;
    price:number;
    stock:number;
    isFeatured:boolean;
    uniqueId:string;
}

const productSchema = new mongoose.Schema({
  uniqueId:{
    type:String,
    required: true
  },
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
  subCategory:{
    type:String,
    required: true,
  },
  price:{
    type:Number,
    required: true
  },
  stock:{
    type:Number,
    default: 5
  },
  isFeatured:{
    type:Boolean,
    default: false
  },

},{timestamps:true});


productSchema.pre('save', function(next){
  this.category = this.category.toLowerCase()
  this.subCategory = this.subCategory.toLowerCase()
  next()
})

const Product = mongoose.model<TypeProduct>('Product', productSchema);

export default Product;