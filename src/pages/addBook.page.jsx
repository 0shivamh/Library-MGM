import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import { MuiChipsInput } from 'mui-chips-input'
import {useRef, useState} from "react";
import Swal from "sweetalert2";
import DashboardPage from "./dashboard.page";

const AddBookPage=(props)=>{

    const [bookAvailability, setBookAvailability] = useState('')
    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookExcert, setBookExcert] = useState('')
    const [bookContent, setBookContent] = useState('')
    const [bookGenres, setBookGenres] = useState('')

    const closeBtn=useRef();
    const handleChange = (newChips) => {
        setBookGenres(newChips) //bookGenres
    }

    // function to add book data
    async function AddBook(event){
        event.preventDefault()
        const response= await fetch("http://localhost:5003/api/addBook",
            {
                method:'POST',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'email_id':localStorage.getItem('email'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // _id,
                    bookAvailability,
                    bookTitle,
                    bookAuthor,
                    bookExcert,
                    bookContent,
                    bookGenres,
                }),

            })
        const data= await response.json();

        if(data.status==='okay'){
            Swal.fire(
                {title:'Book detail successfully',
                    icon:'success',
                    confirmButtonColor: '#5ae4a7'}
            ).then((result)=>{
                if (result.isConfirmed) {
            }})
            closeBtn.current.click();
            props.getBooks(); // to refresh internally
            setBookAvailability("")
            setBookTitle("")
            setBookAuthor("")
            setBookExcert("")
            setBookContent("")
            setBookGenres("")
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Failed to add!',
                    text:'contact administrator!',
                    icon:'error',
                    confirmButtonColor: '#5ae4a7'}
            )

            setBookAvailability("")
            setBookTitle("")
            setBookAuthor("")
            setBookExcert("")
            setBookContent("")
            setBookGenres("")
        }
    }

    return(<>

        <Modal
            show={props.show}
            cancel={props.close}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form className="text-center mt-2" onSubmit={AddBook}>
                        <Form.Select value={bookAvailability}
                                     onChange={(e)=> setBookAvailability(e.target.value)} >
                            <option>Book Availability status</option>
                            <option>Available</option>
                            <option>Not Available</option>
                        </Form.Select>
                        <FloatingLabel controlId="floatingPassword" label="Book Title">
                            <Form.Control type="text" placeholder="name@cloudredux.com"
                                          value={bookTitle}
                                          onChange={(e)=> setBookTitle(e.target.value)}       />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Author">
                            <Form.Control type="text" placeholder="name@cloudredux.com"
                                          value={bookAuthor}
                                          onChange={(e)=> setBookAuthor(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Excert">
                            <Form.Control type="text" placeholder="name@cloudredux.com"
                                          value={bookExcert}
                                          onChange={(e)=> setBookExcert(e.target.value)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Content">
                            <Form.Control as="textarea" style={{ height: 150 }} placeholder="name@cloudredux.com"
                                          value={bookContent}
                                          onChange={(e)=> setBookContent(e.target.value)}/>
                        </FloatingLabel>
                        <MuiChipsInput className="form-control mt-2"   helperText={bookGenres.length > 0 ? "Double click to edit a chip" : ""}
                                       placeholder="Type Genres and Enter" value={bookGenres} onChange={handleChange} />

                        <Button className="white-btn mt-2 m-2" type="submit">
                            Add a Book
                        </Button>
                        <Button ref={closeBtn} className="white-btn mt-2 m-2" onClick={props.close} >
                            Cancel
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>



        </>)
}
export default AddBookPage;
