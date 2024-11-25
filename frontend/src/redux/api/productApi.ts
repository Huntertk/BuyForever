import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { type TypeProduct } from '../typs';

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1"
    }),
    endpoints:(builder) => ({
        getProductByParams: builder.query<{products:TypeProduct[]}, {featured:boolean|undefined, category:string|undefined, subCategory:string|undefined}>({
            query:(params) => {
                return {
                    url:"/product",
                    params:{
                        featured:params.featured,
                        category:params.category,
                        subcategory:params.subCategory
                    }
                }
            }
        }),
    })
})

export const {useGetProductByParamsQuery} = productApi