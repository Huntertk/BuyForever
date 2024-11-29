import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { type TypeFilterProduct, type TypeProduct } from '../typs';

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1"
    }),
    endpoints:(builder) => ({
        getProductByParams: builder.query<{products:TypeProduct[],totalPage:number}, TypeFilterProduct>({
            query:(params) => {
                return {
                    url:"/product",
                    params:{
                        featured:params.featured,
                        category:params.category,
                        subcategory:params.subCategory,
                        search:params.search,
                        sortby:params.sortby,
                        page:params.page
                    }
                }
            }
        }),
        getProductById:builder.query<TypeProduct, {id?:string}>({
            query:(params) => {
                return {
                    url:`/product/${params.id}`,
                }
            }
        }),
    })
})

export const {useGetProductByParamsQuery, useGetProductByIdQuery} = productApi