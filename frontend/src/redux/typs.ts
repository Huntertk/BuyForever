export type TypeProduct = {
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

export type TypeFilterProduct = {
    featured:boolean|undefined;
    category:string|undefined;
    subCategory:string|undefined;
    search:string|undefined;
    sortby:string|undefined;
    page:number;
}

export type TypeUser = {
    _id:string;
    name:string;
    email:string;
    password:string;
    role:string,
}

type TypeShippingInfo = {
    phone:string;
    state:string;
    city:string;
    country:string;
    zipCode:string;
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
    orderItems:TypeOrderItems[];
    paymentMethod:"COD"|"Card";
}

export type TypeOrders = {
    _id:string;
    shippingInfo:TypeShippingInfo;
    orderItems:TypeOrderItems[]
    userId:string;
    itemsPrice:number;
    shippingAmount:number;
    totalAmount:number;
    paymentMethod:"COD"|"Card";
    paymentStatus:"pending"|"paid";
    orderStatus:"Processing"|"Shipped"|"Delivered"|"Cancelled";
    orderRemarks:string;
    deliverdAt:Date;
}