// import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Logout = () => {
    let navigate = useNavigate();



    const handleLogout = ()=>{
        localStorage.clear();
        sessionStorage.clear();

        navigate(`/`);

        Swal.fire(
            {title:'Logout Successful!',
            icon:'success',
            confirmButtonColor: '#242B2E', allowOutsideClick: false,
            allowEscapeKey: false,}
          ).then((result) => {
            if (result.isConfirmed) {
            }
          })
    }

    return(
        <>
            <button  className="btn white-btn" onClick={handleLogout}>Sign Out</button>

        </>
    )
}
export default Logout;
