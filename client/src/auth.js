import {Navigate, Outlet} from "react-router-dom";

const Auth =() =>{


    const auth=localStorage.getItem('token')

    if(auth){
        return <Outlet/>
    }
    else{
        return <Navigate to="/"/>
    }

    return(
        <>

        </>
    )
}
export default Auth;

