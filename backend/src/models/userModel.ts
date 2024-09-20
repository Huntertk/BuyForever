import mongoose from "mongoose";

type TypeUserSchema = {
    _id:string;
    name:string;
    email:string;
    password:string;
    role:"user" | "admin"
}


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user", "admin"]
    }
}, {timestamps:true})



const User = mongoose.model<TypeUserSchema>('User', userSchema);

export default User;