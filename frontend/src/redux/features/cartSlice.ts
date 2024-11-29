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

type TypeCartState = {
    cartItems:TypeCartItemState[]
}

// Define the initial state using that type
const initialState: TypeCartState =  {
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [], 
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
        }
    }
})


export const {addItemToCart} = cartSlice.actions;
export default cartSlice.reducer;