import {Button, Card, Carousel, Col, ListGroup, Row} from "react-bootstrap";
import "./style.page.css"
import img1 from "../images/1.png"
import img2 from "../images/2.png"
import img3 from "../images/3.png"
import img4 from "../images/4.png"
const HomePage=()=>{

    return(<>
        <div>
            <Row>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img1}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img2}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img3}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img4}
                        />
                    </Carousel.Item>
                </Carousel>
            </Row>

            <p className="display-5">Check-out collection our books</p>

            <Row  className="row-cols-lg-5 g-2 m-4">
                {[
                    'Primary',
                    'Secondary',
                    'Success',
                    'Danger',
                    'Warning',
                    'Info',
                    'Light',
                    'Dark',
                ].map((item) => (
                <Col key={item}>
                    <Card border="dark">
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Book Title</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Button className="cbtn">View Content</Button>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
        </>)
}
export default HomePage;
