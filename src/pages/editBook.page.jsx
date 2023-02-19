import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {MuiChipsInput} from "mui-chips-input";
import {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import ViewBooksPage from "./viewBooks.page";

const EditBookPage=(props)=>{


    const [bookAvailability, setBookAvailability] = useState("")
    const [bookTitle, setBookTitle] = useState("")
    const [bookAuthor, setBookAuthor] = useState("")
    const [bookExcert, setBookExcert] = useState("")
    const [bookContent, setBookContent] = useState("")
    const [bookGenres, setBookGenres] = useState()

    const closeBtn= useRef();

    const [refreshVal,setrefreshVal]=useState(false)

    const handleChange = (newChips) => {
        setBookGenres(newChips) //bookGenres
    }

    // set initial values
    useEffect(()=>{
        setBookAvailability(props.book.bookAvailability)
        setBookTitle(props.book.bookTitle)
        setBookAuthor(props.book.bookAuthor)
        setBookExcert(props.book.bookExcert)
        setBookContent(props.book.bookContent)

        setBookGenres(props.book.bookGenres)
    },[props.book])

    async function updateBook(event){
        event.preventDefault()
        const response= await fetch(`http://localhost:5003//api/editBook/${props.book._id}`,
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
                {title:'Book detail updated successfully',
                    icon:'success',
                    confirmButtonColor: '#5ae4a7'}
            )
            closeBtn.current.click();
            props.getBooks(); // to refresh internally
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Failed to edit!',
                    text:'contact administrator!',
                    icon:'error',
                    confirmButtonColor: '#5ae4a7'}
            )
        }
    }

    // useEffect(()=>{
    //
    // })

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
                    Update Book Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form className="text-center mt-2" onSubmit={updateBook} >
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
                        <MuiChipsInput className="form-control mt-2" placeholder="Genres" value={bookGenres} onChange={handleChange} />

                        <Button className="white-btn mt-2 m-2" type="submit">
                            Update
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
export default EditBookPage;
