import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


// Define a type for the slice state
type TypeUserState = {
    email:string|null;
    name:string|null;
    role:string|null;
    isAuthenticated:boolean;

}

// Define the initial state using that type
const initialState: TypeUserState = {
    email:null,
    name:null,
    role:null,
    isAuthenticated:false
}


export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        userLoginSuccess:(state, action: PayloadAction<{
            email:string|null;
            name:string|null;
            role:string|null;
            isAuthenticated:boolean;
        }>) => {
            state.email = action.payload.email,
            state.name = action.payload.name,
            state.role = action.payload.role,
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
})


export const {userLoginSuccess} = userSlice.actions;
export default userSlice.reducer;