import {Navigate, Outlet} from "react-router-dom";

const NoAuth =() =>{


    const auth=localStorage.getItem('token')

    if(auth){
        return <Navigate to="/dashboard"/>
    }
    else{
        return <Outlet/>
    }
}
export default NoAuth;

