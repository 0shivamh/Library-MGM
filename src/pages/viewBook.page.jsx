import {useEffect, useState} from "react";
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {MuiChipsInput} from "mui-chips-input";

const ViewBookPage=(props)=>{

    return(
        <>
            <Modal
                id={props.bookId}
                show={props.show}
                cancel={props.close}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Book Id: {props._id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title><b>Book Availability:</b> {props.book.bookAvailability}</Modal.Title>
                    <p><b>Book Title:</b> {props.book.bookTitle}</p>
                    <p><b>Book Author:</b> {props.book.bookAuthor}</p>
                    <p><b>Book Excert:</b> {props.book.bookExcert}</p>
                    <p><b>Book Content:</b> {props.book.bookContent}</p>
                    <p><b>Book Genres:</b> </p>
                    {/*{book.bookGenres.map((e, id) => (*/}
                    {/*        <p>{e}</p>*/}
                    {/*))}*/}
                    <Button className="white-btn mt-2 m-2" onClick={props.close} >
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ViewBookPage;
