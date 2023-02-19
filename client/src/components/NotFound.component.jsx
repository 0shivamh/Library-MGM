import {Container,Image} from "react-bootstrap";
import notFound from "../images/404.svg"
const NotFoundComponent=()=>{

    return(
        <>
            <Container className="text-center">
                <Image src={notFound} />
            </Container>
        </>
    )
}
export default NotFoundComponent
