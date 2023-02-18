import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { AiFillDelete,AiFillEdit,AiFillEye } from 'react-icons/ai';

import "./style.page.css"
import BackbtnComponent from "../components/backbtn.component";
import {useEffect, useState} from "react";
import AddBookPage from "./addBook.page";
import Swal from "sweetalert2";
import ViewBookPage from "./viewBook.page";
import EditBookPage from "./editBook.page";
const DashboardPage=()=>{
    const navigate = useNavigate();
    const [showAddBook, setShowAddBook] = useState(false);
    const [showBook, setShowBook] = useState(false);
    const [SediBook, setSEditBook] = useState(false);

    const [librarian,setLibrarian]=useState([])
    const [query, setQuery] = useState("")
    const [len, setLen] = useState();
    const [books, setBooks] = useState([]);


    async function getUser(){
        const email=localStorage.getItem('email')
        const response= await fetch(`http://localhost:5003/api/lib/${email}`,);
        const data= await response.json();
        setLibrarian(data)
    }

    async function getBooks(){
        const response= await fetch("http://localhost:5003/api/viewBooks");
        const data= await response.json();
        setBooks(data);
        setLen(data.length);
    }

    async function removeBook(book_id){
        Swal.fire(
            {title:'Are you Sure to remove?',
                icon:'warning',
                confirmButtonColor: 'black', allowOutsideClick: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                allowEscapeKey: true,}
        ).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5003/api/removeBook/${book_id}`, {
                    method: 'POST',
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'email_id': localStorage.getItem('email'),
                        'Content-Type': 'application/json'
                    }

                })
                const data = await response.json();

                if (data.status === 'okay') {
                    Swal.fire(
                        {
                            title: 'Book Deleted Successful!',
                            icon: 'success',
                            confirmButtonColor: '#242B2E', allowOutsideClick: false,
                            allowEscapeKey: false,
                        }
                    )
                    getBooks()

                }
                else if (data.status === 'error') {
                    Swal.fire(
                        {
                            title: 'Please try Again!',
                            icon: 'error',
                            confirmButtonColor: '#242B2E', allowOutsideClick: false,
                            allowEscapeKey: false,
                        }
                    )
                }
            }
        })

    }

    // get boo details
    const [book, setBook] = useState([]);
    async function getBook(book_id){
        const response= await fetch(`http://localhost:5003/api/getBook/${book_id}`);
        const data = await response.json();
        setBook(data);
    }

    useEffect(()=>{
        getUser();
        getBooks();
    },[])

    const [bookId,setBookId]=useState("")
    function handleView(_id) {
        setBookId(_id)
        getBook(_id)
        setShowBook(true)
    }

    function handleEdit(_id) {
        getBook(_id)
        setSEditBook(true)
    }

    return(
        <>
            <ViewBookPage bookId={bookId} book={book} show={showBook} close={()=>setShowBook(false)}/>
            <EditBookPage book={book} show={SediBook} close={()=>setSEditBook(false)}/>
            <div className="m-2">
                <Row className="align-items-end">
                    <BackbtnComponent/>
                    <Col>
                        <form className="d-flex" role="search">
                            <input className="form-control " type="search" onChange={event => setQuery(event.target.value)} placeholder="Search Book" aria-label="Search"/>
                        </form>
                    </Col>
                    <Col>

                        <Button variant="dark" onClick={() => setShowAddBook(true)}>Add a Book</Button>
                        <AddBookPage show={showAddBook} close={()=>setShowAddBook(false)}/>

                    </Col>

                    <Col>
                        <Card >
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
                <Row xs={2} className="text-center m-1 ">
                    <Table striped bordered hover variant="dark" className="shadow">
                        <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Book Availability</th>
                            <th>Book Title</th>
                            <th>Book Author</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            books.filter(book => {
                                if (query === '') {
                                    return book;
                                } else if (book.bookTitle.toLowerCase().includes(query.toLowerCase())) {
                                    return book;
                                }
                            }).map((e, id) => (
                                <tr>
                                    <td>{id+1}</td>
                                    <td>{e.bookAvailability}</td>
                                    <td>{e.bookTitle}</td>
                                    <td>{e.bookAuthor}</td>
                                    <td style={{textAlign:"right"}}>

                                        <Button title="View" className="op-btn m-2" variant="light" size="sm" onClick={()=>{
                                            handleView(books[id]._id)}
                                        }>
                                            <AiFillEye/>
                                        </Button>
                                        <Button title="View" className="op-btn m-2" variant="light" size="sm" onClick={ ()=>{
                                        removeBook(books[id]._id)}
                                        }>
                                            <AiFillDelete/>
                                        </Button>

                                        <Button title="View" className="op-btn m-2" variant="light" size="sm" onClick={()=>{
                                            handleEdit(books[id]._id)}
                                        }>
                                            <AiFillEdit/>
                                        </Button>


                                    </td>
                                </tr>

                            ))
                        }

                        </tbody>
                    </Table>
                </Row>

            </div>
        </>
    )
}
export default DashboardPage;
