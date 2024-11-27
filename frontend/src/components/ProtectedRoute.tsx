import React from "react"
import { Navigate } from "react-router-dom"
import { useGetMeDataQuery } from "../redux/api/authApi"
import Loader from "./Loader"

type TypeProtectedRouteProps = {
    children:React.ReactNode
}

const ProtectedRoute = ({children}:TypeProtectedRouteProps) => {
    const {data, isLoading} = useGetMeDataQuery({})
    if(isLoading){
        return <Loader />
    }
    
    return data ? children : <Navigate to="/" />
}

export default ProtectedRoute