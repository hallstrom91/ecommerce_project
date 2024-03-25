import { Col, Row, Container, Spinner } from "react-bootstrap";

export default function LoadingScreen() {
  return (
    <>
      <Container className="p-4">
        <Col className="d-flex justify-content-center mb-5 mt-5">
          <Row className="d-flex mb-5 mt-5">
            <Spinner animation="border" variant="dark" role="loading">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        </Col>
      </Container>
    </>
  );
}
