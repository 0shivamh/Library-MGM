import {Button, FloatingLabel, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Swal from "sweetalert2";

const ResetPswComponent=()=>{
    const [libId,setLibId] = useState();
    const [psw,setPsw] = useState();

    let navigate = useNavigate();


    async function handleReset(event){
        event.preventDefault()
        const response= await  fetch(`http://localhost:5003/api/lib/reset/${libId}`,
            {
                method:'POST',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'email_id':localStorage.getItem('email'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // _id,
                    libId,
                    psw,
                }),

            })
        const data= await response.json();
        if(data.status==='okay'){
            Swal.fire(
                {title:'Password reset successfully',
                    icon:'success',
                    confirmButtonColor: '#5ae4a7'}
            )
            navigate("/signIn")
            setLibId("")
            setPsw("")
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Failed to reset!',
                    text:'contact administrator!',
                    icon:'error',
                    confirmButtonColor: '#5ae4a7'}
            )
            setLibId("")
            setPsw("")
        }
    }

    return(
        <>
            <div className="d-flex justify-content-center m-4">
                <Form className="text-center c-form" onSubmit={handleReset}>
                    <p className="h2">Forgot Password? </p>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Librarian Id"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="name@example.com"
                                      value={libId}
                                      onChange={(e)=> setLibId(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password"
                                      value={psw}
                                      onChange={(e)=> setPsw(e.target.value)}/>
                    </FloatingLabel>
                    <Button className="white-btn mt-2 mb-2" type="submit">
                        Reset
                    </Button>
                    <Link to="/signIn" className="nav-link">Sign In Now
                    </Link>
                </Form>
            </div>
        </>
    )
}
export default ResetPswComponent;
