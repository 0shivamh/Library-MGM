import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const SignInPage=()=>{

    const [email,setEmail] = useState();
    const [psw,setPsw] = useState();

    let navigate = useNavigate();

    async function handleSignIn(event){
        event.preventDefault()
        const response= await fetch("http://localhost:5003/api/signin",
            {
                method:'POST',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    psw,
                }),
            })
        const data= await response.json();

        if(data.status==='okay'){
            localStorage.setItem('token',data.user)
            localStorage.setItem('email',email);

            Swal.fire(
                {title:'Login Successful!',
                    text:'Welcome to admission portal!',
                    icon:'success',
                    confirmButtonColor: '#242B2E',
                    allowOutsideClick: false,
                    allowEscapeKey: false}
            ).then((result) => {
                if (result.isConfirmed) {
                }
            })
            navigate(`/dashboard`);
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Login Failed!',
                    text:'Please check email or password!',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
        }
        //to clear all field
        setEmail("");
        setPsw("")
    }

    return(<>
        <div className="d-flex justify-content-center m-4">
            <Form className="text-center" onSubmit={handleSignIn}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com"
                                  value={email}
                                  onChange={(e)=> setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                                  value={psw}
                                  onChange={(e)=> setPsw(e.target.value)}/>
                </FloatingLabel>
                <Button className="white-btn mt-2 mb-2" type="submit">
                    Sign In
                </Button>
            </Form>
        </div>

    </>)
}
export default SignInPage;
