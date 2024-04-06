import { Col, Row, Container } from "react-bootstrap";
import CarouselSlide from "@shared/CarouselSlide";

export default function Home() {
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h1 className="text-center">Välkommen till FashionHub</h1>
          </Col>
        </Row>
        <Row>
          {/* SlideShow of "FashionHub-Crew" */}
          <Col md={12}>
            <CarouselSlide />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center m-4">
            <h5 className="text-center m-4">
              Vi är stolta över att presentera vår nyöppnade webbshop, där du
              kan upptäcka de senaste trenderna och hitta din personliga stil.
              Registrera dig idag för att ta del av exklusiva bonusar och
              erbjudanden framöver! Som registrerad medlem hos oss får du
              tillgång till specialerbjudanden, förtur till nya kollektioner och
              personlig shoppingrådgivning från vårt erfarna team av stylister.
              Gå med oss på FashionHub och låt oss tillsammans skapa en mer
              hållbar och stilfull framtid!
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  );
}
