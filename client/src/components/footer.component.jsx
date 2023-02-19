import {Container, Row, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./style.component.css"
import logo from "../images/logo.png";
const FooterComponent =()=>{
    return(<>
        <div className="foot noprint">
        <Container style={{marginTop:"60px"}} >
            <Row>
                <Col>
                    <p className="h5"><b><img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="BigBooster"
                    />Library MGM</b></p>
                    <p>Smart way to manage your library</p>
                </Col>
                <Col >
                    <Link to="" className="link-footer">Security</Link><br/>
                    <Link to="" className="link-footer">Privacy</Link><br/>
                    <Link to="" className="link-footer">Payment</Link><br/>
                    <Link to="" className="link-footer">Terms</Link><br/>
                </Col>
                <Col>
                    <Link to="" className="link-footer">About</Link><br/>
                    <Link to="" className="link-footer">Source</Link><br/>
                    <Link to="" className="link-footer">Contact</Link><br/>
                    <Link to="" className="link-footer">Help</Link><br/>
                </Col>
                <Col>

                    <Image className="img-fluid" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" />

                </Col>
                <hr className="mt-2"/>
                <span><img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block mb-2"
                    alt="BigBooster"
                /> Library MGM © {new Date().getFullYear()} All Rights Reserved{" "}</span>
                <hr/>

            </Row>
        </Container>
        </div>
        </>)
}
export default FooterComponent;
