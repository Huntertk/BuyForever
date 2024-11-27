import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import  userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";

export const store = configureStore({
    reducer:{
        user: userReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        productApi.middleware,
        authApi.middleware,
    ])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch