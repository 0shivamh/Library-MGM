import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";

const SignUpPage=()=>{

    const [libId,setLibId] = useState();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [psw,setPsw] = useState();

    let navigate = useNavigate();

    async function handleSignUp(event){
        event.preventDefault()
        const response= await fetch("https://library-mgm-cmf5.vercel.app/api/signUp",
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    libId,
                    name,
                    email,
                    psw,
                    phone,
                }),

            })
        const data= await response.json();
        // console.log(data)

        if(data.status==='Okay'){
            Swal.fire(
                {title:'Registration Successful!',
                    text:'Please login and continue',
                    icon:'success',
                    confirmButtonColor: '#242B2E'}
            )
            navigate(`/signIn`);
            //to clear all field
            setLibId("")
            setName("")
            setEmail("")
            setPsw("")
            setPhone("")
        }
        else if(data.status==='error-psw'){
            Swal.fire(
                {title:'Registration Failed!',
                    text:'Password should be minimum 8 character or more',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
            setPsw("")
        }
        else if(data.status==='error-email'){
            Swal.fire(
                {title:'Email Already Registered!',
                    text:'Please check all details!',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
            setEmail("")
        }
        else if(data.status==='error-team'){
            Swal.fire(
                {title:'Employee Id Already Exist!',
                    text:'Please change it !',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
            setLibId()
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Registration Failed!',
                    text:'Please check all details!',
                    icon:'error',
                    confirmButtonColor: '#242B2E'}
            )
            setLibId("")
            setName("")
            setEmail("")
            setPsw("")
            setPhone("")

        }

    }


    return(<>

        <div className="d-flex justify-content-center m-4">
            <Form className="text-center c-form" onSubmit={handleSignUp}>
                <p className="h2">Sign Up</p>
                <FloatingLabel controlId="floatingPassword" label="Librarian Id">
                    <Form.Control type="text" placeholder="name@cloudredux.com"
                                  value={libId}
                                  onChange={(e)=> setLibId(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Full Name">
                    <Form.Control type="text" placeholder="name@cloudredux.com"
                                  value={name}
                                  onChange={(e)=> setName(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Email Address">
                    <Form.Control type="email" placeholder="name@cloudredux.com"
                                  value={email}
                                  onChange={(e)=> setEmail(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Mobile Number">
                    <Form.Control type="number" placeholder="name@cloudredux.com"
                                  value={phone} maxlength="12"
                                  onChange={(e)=> setPhone(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password"
                                  value={psw}
                                  onChange={(e)=> setPsw(e.target.value)}/>
                </FloatingLabel>
                <Button className="white-btn mt-2 mb-2" type="submit">
                    Sign Up
                </Button>
                <Link to="/signIn" className="nav-link">Already have an account? SignIn Now
                </Link>
            </Form>
        </div>

        </>)
}
export default SignUpPage;
