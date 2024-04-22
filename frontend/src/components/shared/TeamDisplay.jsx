import { Card, Placeholder, Col, Row } from "react-bootstrap";
export default function TeamDisplay() {
  return (
    <>
      <div className="m-3">
        <Row className="justify-content-center">
          {/* FashionHub Crew Picture, Card 1 */}
          <Col md={6} className="mb-3">
            <Card>
              <Card.Img src="/FashionHubCrew.png" variant="top" fluid />
              <Card.Body>
                <Card.Title className="text-center fs-3 fw-bold text-white">
                  FashionHub Teamet
                </Card.Title>
                <Card.Text className="text-center fs-5 text-white">
                  Här tar vårt kära team på FashionHub emot en ny leverans med
                  kläder för att lägga in i sortimentet.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* FashionHub Crew Picture, Card 2 */}
          <Col md={6} className="mb-3">
            <Card>
              <Card.Img src="/FashionHubCrew2.png" variant="top" />
              <Card.Body>
                <Card.Title className="text-center fs-3 fw-bold text-white">
                  FashionHub Teamet
                </Card.Title>
                <Card.Text className="text-center fs-5 text-white">
                  Här tar vårt kära team emot och packar alla era orders för
                  blixt snabba utskick! Tack för all support!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
