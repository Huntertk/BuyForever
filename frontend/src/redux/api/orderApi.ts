import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { type TypeOrder } from '../typs';



export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1/order"
    }),
    endpoints:(builder) => ({
        createOrderByCOD:builder.mutation<{message:string}, TypeOrder>({
            query:(body) => {
                return {
                    url:"/create-cod",
                    method:"POST",
                    body
                }
            }
        })
    })
})

export const {useCreateOrderByCODMutation} = orderApi