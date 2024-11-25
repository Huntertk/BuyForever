import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { type TypeProduct } from '../typs';

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1"
    }),
    endpoints:(builder) => ({
        getFeaturedProduct: builder.query<{products:TypeProduct[]}, {featured:boolean}>({
            query:(params) => {
                return {
                    url:"/product",
                    params:{
                        featured:params.featured
                    }
                }
            }
        }),
    })
})

export const {useGetFeaturedProductQuery} = productApi