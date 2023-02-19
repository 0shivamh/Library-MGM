// import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Navbar} from "react-bootstrap";
const Logout = (props) => {
    let navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.clear();
        sessionStorage.clear();
        props.auth(false)
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
