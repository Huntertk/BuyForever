import mongoose from "mongoose";

type TypeShippingInfo = {
    phone:string;
    state:string;
    city:string;
    country:string;
    zipCode:number;
}

type TypeOrderItems = {
    title:string;
    quantity:number;
    image:string;
    price:number;
    productId:string;

}

export type TypeOrder = {
    shippingInfo:TypeShippingInfo;
    orderItems:TypeOrderItems[]
    userId:string;
    itemsPrice:number;
    shippingAmount:number;
    totalAmount:number;
    paymentMethod:"COD"|"Card";
    paymentStatus:"pending"|"paid";
    orderStatus:"Processing"|"Shipped"|"Delivered";
    deliverdAt:Date;
}

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        phone:{
            type:String,
            required: true
        },
        state:{
            type:String,
            required: true
        },
        city:{
            type:String,
            required: true
        },
        country:{
            type:String,
            required: true
        },
        zipCode:{
            type:Number,
            required: true
        },
    },
    orderItems:[
        {
            title:{
                type:String,
                required: true
            },
            quantity:{
                type:Number,
                required: true
            },
            image:{
                type:String,
                required: true
            },
            price:{
                type:Number,
                required: true
            },
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true
            },
        }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    itemsPrice:{
        type:Number,
        required: true
    },
    shippingAmount:{
        type:Number,
        required: true
    },
    paymentMethod:{
        type: String,
        required: [true, "Please select payment method"],
        enum:{
            values: ["COD", "Card"],
            message:"Please select correct payment method"
        }        
    },
    paymentStatus:{
        type: String,
        default:"pending"
    },
    totalAmount:{
        type:Number,
        required: true
    },
    orderStatus:{
        type:String,
        enum:["Processing","Shipped","Delivered"],
        default:"Processing"
    },
    deliverdAt:{
        type:Date,
    }
    
},{timestamps:true})


const Order = mongoose.model<TypeOrder>('Order', orderSchema)
export default Order;