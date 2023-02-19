import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";

const SignInPage=(props)=>{

    const [email,setEmail] = useState();
    const [psw,setPsw] = useState();

    let navigate = useNavigate();

    async function handleSignIn(event){
        event.preventDefault()
        const response= await fetch("https://library-mgm-cmf5.vercel.app/api/signin",
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
                    props.auth(true)
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
            <Form className="text-center c-form" onSubmit={handleSignIn}>
                <p className="h2">Sign In</p>
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
                <Link to="/signUp" className="nav-link">Don't have an account? Register Now
                </Link>
                <Link to="/password-reset" className="nav-link" >Forgot Password?</Link>
            </Form>
        </div>

    </>)
}
export default SignInPage;
