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