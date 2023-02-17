import {Button, Container, FloatingLabel, Form} from "react-bootstrap";

const SignInPage=()=>{
    return(<>
        <div className="d-flex justify-content-center m-4">
            <Form className="text-center">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Button className="white-btn mt-2 mb-2" type="submit">
                    Sign In
                </Button>
            </Form>
        </div>

    </>)
}
export default SignInPage;
