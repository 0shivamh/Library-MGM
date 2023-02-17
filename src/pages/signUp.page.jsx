import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";

const SignUpPage=()=>{

    const [libId,setLibId] = useState();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [psw,setPsw] = useState();

    return(<>

        <div className="d-flex justify-content-center m-4">
            <Form className="text-center">
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
                                  value={phone}
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
            </Form>
        </div>

        </>)
}
export default SignUpPage;
