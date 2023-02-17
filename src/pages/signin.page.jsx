import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";

const SignInPage=()=>{

    const [email,setEmail] = useState();
    const [psw,setPsw] = useState();

    return(<>
        <div className="d-flex justify-content-center m-4">
            <Form className="text-center">
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
