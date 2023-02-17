
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logout from "./logout.component";
import logo from "../images/logo.png"
const NavbarComponent = () =>{

    const token = localStorage.getItem('token');

    return(

        <>
            <Navbar  className="noprint py-4" sticky="top"  expand="lg shadow" bg="dark" style={{color:"white"}}>
                <Container>
                    <Navbar.Brand  style={{color:"white"}} href="/" >
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="BigBooster"
                        /> Admission Portal</Navbar.Brand>
                    <Navbar.Toggle style={{color:"white"}} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav" style={{color:"white"}}>
                        <Nav className="ms-auto mb-2 mb-lg-0 d-fle"  style={{color:"white"}} >
                            <Nav.Link style={{color:"white"}} href="/">Home</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/">Contact</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/">Help</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/">Support</Nav.Link>

                            {
                                token? <Logout/>:
                                    <Link  className="btn white-btn" to="/signin">Sign In</Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarComponent;
