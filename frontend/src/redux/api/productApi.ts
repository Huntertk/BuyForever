import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { type TypeFilterProduct, type TypeProduct } from '../typs';

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1"
    }),
    endpoints:(builder) => ({
        getProductByParams: builder.query<{products:TypeProduct[]}, TypeFilterProduct>({
            query:(params) => {
                return {
                    url:"/product",
                    params:{
                        featured:params.featured,
                        category:params.category,
                        subcategory:params.subCategory,
                        search:params.search
                    }
                }
            }
        }),
    })
})

export const {useGetProductByParamsQuery} = productApi