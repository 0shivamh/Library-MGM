import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const BackbtnComponent = ()=>{

    // back btn comp

    return(<>
                <Row xs={2} className="noprint">
                    <Col>
                        <Link to="/" className="btn btn-dark m-1">Home</Link>

                        <Link to={-1} className="btn btn-dark m-1">Back</Link>
                    </Col>
                    <Col>

                    </Col>
                </Row>
        </>)
}
export default BackbtnComponent;
