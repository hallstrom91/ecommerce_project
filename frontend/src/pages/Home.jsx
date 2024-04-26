import { Col, Row, Container, Card, ProgressBar } from "react-bootstrap";
import TeamDisplay from "@shared/TeamDisplay";

export default function Home() {
  const progressBar = 68;
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h1 className="text-center">Välkommen till FashionHub</h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center m-4">
            <Card>
              <Card.Header className="list-group-header">
                <p className="text-center m-4 text-white">
                  Vi är stolta över att presentera vår nyöppnade webbshop, där
                  du kan upptäcka de senaste trenderna och hitta din personliga
                  stil. Registrera dig idag för att ta del av exklusiva bonusar
                  och erbjudanden framöver! Som registrerad medlem hos oss får
                  du tillgång till specialerbjudanden, förtur till nya
                  kollektioner och personlig shoppingrådgivning från vårt
                  erfarna team av stylister. Gå med oss på FashionHub och låt
                  oss tillsammans skapa en mer hållbar och stilfull framtid!
                </p>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-center text-white">
                  För varje produkt vi säljer, så donerar vi 10kr tills vi når
                  målet på <strong>1 000 000kr</strong>
                </Card.Text>
                <Card.Text className="text-center fw-bold text-white">
                  Detta är ett skolprojekt av en fiktiv webshop. Alla bilder är
                  gjorda med hjälp av Gencraft.com
                </Card.Text>
                <div>
                  <ProgressBar
                    animated
                    now={progressBar}
                    label={`${progressBar}%`}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Card Pic Display of "FashionHub-Crew" Working */}
        <Row>
          <Col md={12}>
            <TeamDisplay />
          </Col>
        </Row>
      </Container>
    </>
  );
}
