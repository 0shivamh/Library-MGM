
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logout from "./logout.component";
import logo from "../images/logo.png"
import { RxAvatar } from 'react-icons/rx';

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
                        /> Library MGM</Navbar.Brand>
                    <Navbar.Toggle style={{color:"white"}} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav" style={{color:"white"}}>
                        <Nav className="ms-auto mb-2 mb-lg-0 d-fle"  style={{color:"white"}} >
                            <Link style={{color:"white"}} to="/" className="nav-link">Home</Link>
                            <Link style={{color:"white"}} to="/contact" className="nav-link">Contact</Link>
                            <Link style={{color:"white"}} to="/support" className="nav-link">Support</Link>
                            {
                                token? <Link className="btn white-btn m-lg-1"  to="/dashboard">Dashboard</Link>:null

                            }
                            {
                                token? <Logout/>:
                                    <Link  className="btn white-btn m-lg-1" to="/signIn">Sign In</Link>
                            }
                            {
                                token? null:
                                    <Link  className="btn white-btn m-lg-1" to="/signUp">Sign Up</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarComponent;
