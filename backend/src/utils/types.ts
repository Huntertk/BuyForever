export type TypeRegisterInputPayload = {
    name:string;
    email:string;
    password:string;
}

export type TypeLoginInputPayload = {
    email:string;
    password:string;
}

export type TypeUpdateMeInputPayload = {
    name:string;
    email:string;
}

export type TypeUpdateMyPasswordInputPayload = {
    password:string;
    currentPassword:string;
}

export type TypeNewProductInputPayload = {
    uniqueId:string;
    title:string;
    description:string;
    images:[string],
    category:string;
    subCategory:string;
    price:number;
    stock:number;
    isFeatured:boolean;
}

export type TypeBaseQuery = {
    title?:{
        $regex:string;
        $options:string;
    };
    category?:string;
    subCategory?:string;
    isFeatured?:boolean;
}


export type TypeProductQuery = {
    search?:string;
    category?:string;
    subcategory?:string;
    sortby?:string;
    featured?:boolean;
    fields?:string;
}


export type TypeUpdateOrder = {
    orderId:string;
    orderStatus:"Processing"|"Shipped"|"Delivered"|"Cancelled";
    paymentStatus:"pending"|"paid";
    orderRemarks:string;
}