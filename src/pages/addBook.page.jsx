import BackbtnComponent from "../components/backbtn.component";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import { MuiChipsInput } from 'mui-chips-input'
import {useState} from "react";

const AddBookPage=()=>{

    const [genres, setGenres] = useState([])

    const handleChange = (newChips) => {
        setGenres(newChips)
    }

    return(<>

        <div className="m-2">
            <BackbtnComponent/>
            <Form className="text-center mt-2" >
                <Form.Select  >
                    <option>Book Availability status</option>
                    <option>Available</option>
                    <option>Not Available</option>
                </Form.Select>
                <FloatingLabel controlId="floatingPassword" label="Book Title">
                    <Form.Control type="text" placeholder="name@cloudredux.com"
                                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Author">
                    <Form.Control type="text" placeholder="name@cloudredux.com"
                                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Excert">
                    <Form.Control type="text" placeholder="name@cloudredux.com"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Content">
                    <Form.Control as="textarea" style={{ height: 150 }} placeholder="name@cloudredux.com"
                    />
                </FloatingLabel>
                <MuiChipsInput className="form-control mt-2" placeholder="Genres" value={genres} onChange={handleChange}  />

                <Button className="white-btn mt-2 mb-2" type="submit">
                    Add a Book
                </Button>
            </Form>
        </div>

        </>)
}
export default AddBookPage;
