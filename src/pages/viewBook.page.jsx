import {Offcanvas} from "react-bootstrap";
import {MuiChipsInput} from "mui-chips-input";
import {BsBookHalf} from "react-icons/bs";

const ViewBookPage=(props)=>{

    return(
        <>
            <Offcanvas placement="end" id={props.bookId}
                       show={props.show}
                       cancel={props.close} onHide={props.close}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><BsBookHalf className="h1"/> </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <hr/>
                    <p><b>Book Availability:</b> {props.book.bookAvailability}</p>
                    <p><b>Book Title:</b> {props.book.bookTitle}</p>
                    <p><b>Book Author:</b> {props.book.bookAuthor}</p>
                    <p><b>Book Excert:</b> {props.book.bookExcert}</p>
                    <p><b>Book Content:</b> {props.book.bookContent}</p>
                    <MuiChipsInput className="chips" disableEdition={true} placeholder="Genres" value={props.book.bookGenres}  />
                    <hr/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default ViewBookPage;
