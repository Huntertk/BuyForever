import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


// Define a type for the slice state
type TypeCartItemState = {
    title:string;
    price:number;
    image:string;
    quantity:number;
    productId:string;
    stock:number;
}
type TypeShippingInfoState = {
    phone:string;
    state:string;
    city:string;
    country:string;
    zipCode:string;
}

type TypeCartState = {
    cartItems:TypeCartItemState[];
    shippingInfo:TypeShippingInfoState,
    totalAmount:number;
    shippingAmount:number;
}

// Define the initial state using that type
const initialState: TypeCartState =  {
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [], 
    shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')!) : {},
    totalAmount: 0,
    shippingAmount:0
}


export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addItemToCart:(state, action: PayloadAction<TypeCartItemState>) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.productId === item.productId);
            
            if(isItemExist){
                state.cartItems = state.cartItems.map((i) => (
                    i.productId === isItemExist.productId ? item : i
                ))
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.success("Item added to the cart")
        },
        removeItemFromCart:(state, action: PayloadAction<{productId:string}>) => {
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload.productId)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error("Item removed")
        }, 
        countTotal: (state, action: PayloadAction<{subTotal:number}>) => {
            state.shippingAmount = action.payload.subTotal === 0 ? 0 : action.payload.subTotal > 50 ? 0 : 10;
            state.totalAmount = Number(state.cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)) + state.shippingAmount;
        }, 
        addShippingInfo:(state, action: PayloadAction<{shippingInfo:{phone:string;state:string;city:string;country:string;zipCode:string;}}>) => {
            state.shippingInfo = action.payload.shippingInfo
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
        }, 
    }
})


export const {addItemToCart, removeItemFromCart, countTotal, addShippingInfo} = cartSlice.actions;
export default cartSlice.reducer;