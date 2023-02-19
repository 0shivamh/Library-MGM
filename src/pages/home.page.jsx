import {Badge, Button, Card, Carousel, Col, Row} from "react-bootstrap";
import "./style.page.css"
import img1 from "../images/1.png"
import img2 from "../images/2.png"
import img3 from "../images/3.png"
import img4 from "../images/4.png"
import {useEffect, useState} from "react";
import ViewBookPage from "./viewBook.page";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const HomePage=()=>{

    const [loading,setLoading]=useState(true)
    const [books, setBooks] = useState([]);
    const [showBook, setShowBook] = useState();
    async function getBooks(){
        setLoading(true);
        const response= await fetch("http://localhost:5003/api/viewBooks");
        const data= await response.json();
        setBooks(data);
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    },[])

    // get boo details
    const [book, setBook] = useState([]);
    async function getBook(book_id){
        const response= await fetch(`http://localhost:5003/api/getBook/${book_id}`);
        const data = await response.json();
        setBook(data);
        setLoading(false)
    }

    const [bookId,setBookId]=useState("")
    function handleView(_id) {
        setBookId(_id)
        getBook(_id)
        setShowBook(true)
    }

    return(<>
        <div>
            <ViewBookPage bookId={bookId} book={book} show={showBook} close={()=>setShowBook(false)}/>

            <Row>
                <Carousel fade>
                { loading === false &&
                    [img1,img2,img3].map((e)=>(

                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={e}
                                />
                            </Carousel.Item>

                    ))
                }
                    {
                        loading===true &&
                        <Card  >
                            <Card.Body>
                                <p><Skeleton height="160px" /></p>

                            </Card.Body>
                        </Card>
                    }
                </Carousel>
            </Row>


            <Row xl={5} className="g-4 m-4">
                <p className="display-5">Check-out collection our books ➤</p>

                {loading === false &&
                    books.map((e, id) => (
                            <Col key={id}>
                                <Card className="home-card" onClick={()=>{
                                    handleView(books[id]._id)}}>
                                    <Card.Body>
                                        <p><b>Book Title:</b>{e.bookTitle}</p>
                                        <p><b>Author:</b>{e.bookAuthor}</p>
                                        <p>
                                            <p><b>Book Genres:</b>
                                                {
                                                    e.bookGenres.map((e,id)=>(
                                                        <span>
                                                    <Badge className="m-1" bg="primary">{e}</Badge>
                                                </span>
                                                    ))
                                                }
                                            </p>
                                        </p>
                                        <div >
                                            <Button className="c-btn text-center btn-sm " onClick={()=>{
                                                handleView(books[id]._id)}}>View Content</Button>
                                            <Button className="c-btn text-center btn-sm ">{e.bookAvailability}</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    )}
                {
                    loading===true &&
                    [1,2,3,4,5].map((item,id)=>(
                        <Card key={item} className="home-card m-2" >
                            <Card.Body>
                                <p><Skeleton /></p>
                                <p><Skeleton /></p>
                                <p><Skeleton height="30px" />
                                </p>
                                <div>
                                    <Skeleton />
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Row>
        </div>

        </>)
}
export default HomePage;
