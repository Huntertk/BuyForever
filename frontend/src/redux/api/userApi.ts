import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { authApi } from './authApi';



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
        }),
        updateProfile:builder.mutation<{message:string}, {name:string, email:string}>({
            query:(body) => {
                return {
                    url:"/me/update",
                    method:"PUT",
                    body
                }
            },
            async onQueryStarted({}, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    //Invalidate Tag After Updating User Profile Details
                    // dispatch(authApi.util.invalidateTags(['getUser']))

                    //Refetching Get Me Data
                    await dispatch(authApi.endpoints.getMeData.initiate({}, { forceRefetch: true }));
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})
export const {useUpdatePasswordMutation, useUpdateProfileMutation} = userApi;