import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./style.page.css"
import BackbtnComponent from "../components/backbtn.component";
import {useEffect, useState} from "react";
const DashboardPage=()=>{

    const [librarian,setLibrarian]=useState([])

    async function getUser(){
        const email=localStorage.getItem('email')
        const response= await fetch(`http://localhost:5003/api/lib/${email}`,);
        const data= await response.json();
        setLibrarian(data)
    }

    useEffect(()=>{
        getUser();
    },[])

    return(
        <>
            <div className="m-2">
                <Row>
                    <BackbtnComponent/>
                    <Col>
                        <Card style={{width:"18rem"}}>
                            <Card.Body>
                                <Card.Title>Logged In User Details:</Card.Title>
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row xs={2} className="text-center">
                    <Col>
                        <Card v className="shadow mt-2">
                            <Link to="/dashboard/addBook" className="card-body dash-card" >
                                Add Book Details
                            </Link>
                        </Card>
                    </Col>
                    <Col>
                        <Card  className="shadow mt-2">
                            <Link to="/dashboard/viewBooks" className="card-body dash-card" >
                                View Books
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default DashboardPage;
