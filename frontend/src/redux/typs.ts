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