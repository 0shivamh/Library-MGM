import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {MuiChipsInput} from "mui-chips-input";
import {useState} from "react";

const EditBookPage=(props)=>{

    // console.log(props.book)

    const [bookAvailability, setBookAvailability] = useState(props.book.bookAvailability)
    const [bookTitle, setBookTitle] = useState(props.book.bookTitle)
    const [bookAuthor, setBookAuthor] = useState(props.book.bookAuthor)
    const [bookExcert, setBookExcert] = useState(props.book.bookExcert)
    const [bookContent, setBookContent] = useState(props.book.bookContent)
    const [bookGenres, setBookGenres] = useState(props.book.bookGenres)

    const handleChange = (newChips) => {
        setBookGenres(newChips) //bookGenres
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
                    Update Book Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form className="text-center mt-2" >
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
                        <Button className="white-btn mt-2 m-2" onClick={props.close} >
                            Cancel
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
        </>)
}
export default EditBookPage;
