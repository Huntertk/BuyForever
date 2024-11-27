import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userLoginSuccess } from '../features/userSlice';
import { TypeUser } from '../typs';



export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1/admin"
    }),
    tagTypes:["validateUser"],
    endpoints:(builder) => ({
        login:builder.mutation<{message:string}, {email:string, password:string}>({
            query:(body) => {
                return {
                    url:"/auth/login",
                    method:"POST",
                    body
                }
            },
            invalidatesTags:["validateUser"]
        }),
        getMeData: builder.query<TypeUser, {}>({
            query:() => '/users/me',
            async onQueryStarted ({}, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(userLoginSuccess({email:data.email,name:data.name, role:data.role}))
                } catch (error) {
                    dispatch(userLoginSuccess({email:null,name:null, role:null}))
                }
            },
            providesTags:["validateUser"]
        }),
        logoutAdmin:builder.query({
            query:() => {
                return {
                    url:"/auth/logout",
                }
            }
        }),
    })
})

export const {useLoginMutation, useGetMeDataQuery, useLazyLogoutAdminQuery} = authApi