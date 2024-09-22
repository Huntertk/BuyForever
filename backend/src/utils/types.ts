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