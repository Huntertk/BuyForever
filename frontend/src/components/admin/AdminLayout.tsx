import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";
import { useGetMeDataQuery } from "../../redux/api/authApi";

const AdminLayout = () => {
    const {data, isLoading} = useGetMeDataQuery({});

    if(isLoading){
        return <Loader />
    }
    
    if(data && data.role !== 'admin'){
        return<Navigate to="/"/>
    }
    
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AdminLayout