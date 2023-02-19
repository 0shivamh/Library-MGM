import {Button, Card, Col, Offcanvas, Row} from "react-bootstrap";
import "./style.page.css"
import BackbtnComponent from "../components/backbtn.component";
import {useEffect, useState} from "react";
import ViewBooksPage from "./viewBooks.page";
import {RxAvatar} from "react-icons/rx";
import {BsPersonCircle} from "react-icons/bs";
import AddBookPage from "./addBook.page";
const DashboardPage=()=>{

    const [librarian,setLibrarian]=useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getUser(){
        const email=localStorage.getItem('email')
        const response= await fetch(`https://library-mgm-cmf5.vercel.app/api/lib/${email}`,);
        const data= await response.json();
        setLibrarian(data)
    }


    useEffect(()=>{
        getUser();
    },[])


    return(
        <>

            <div className="m-2">
                <Row xs={2} className="align-items-end">
                    <Col>
                        <BackbtnComponent/>

                    </Col>
                    <Col className="text-end">
                        <span>
                            <span className="h4">Hi {librarian.name} </span>
                            <BsPersonCircle className="h1 " onClick={handleShow}/>
                        </span>
                    </Col>
                </Row>

                <ViewBooksPage/>

            </div>

            <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><RxAvatar/> Logged-In User</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <hr/>
                            <Card.Text>
                                <b>Librarian Id: </b> {librarian.libId}
                            </Card.Text>
                            <Card.Text>
                                <b>Librarian Name: </b> {librarian.name}
                            </Card.Text>
                            <Card.Text>
                                <b>Librarian Contact: </b> {librarian.phone}
                            </Card.Text>
                            <Card.Text>
                                <b>Librarian Email: </b> {librarian.email}
                            </Card.Text>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}
export default DashboardPage;
