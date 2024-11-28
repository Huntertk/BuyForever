import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';



export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1/users"
    }),
    endpoints:(builder) => ({
        updatePassword:builder.mutation<{message:string}, {currentPassword:string, newPassword:string}>({
            query:(body) => {
                return {
                    url:"/me/update/password",
                    method:"PUT",
                    body
                }
            },
        })
    })
})
export const {useUpdatePasswordMutation} = userApi;