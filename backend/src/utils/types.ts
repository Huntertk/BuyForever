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
}

export type TypeNewProductInputPayload = {
    title:string;
    description:string;
    images:[string],
    category:string;
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
}


export type TypeProductQuery = {
    search?:string;
    category?:string;
    sortby?:string
}

export type TypeSortQuery = {
    price?:1|-1;
    title?:1|-1;
}