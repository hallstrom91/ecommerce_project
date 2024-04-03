import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Modal,
  Button,
  Form,
  FloatingLabel,
  ListGroup,
} from "react-bootstrap";

export default function UserDetails({ user }) {
  const [show, setShow] = useState(false);
  const [locked, setLocked] = useState(true);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updatePostal, setUpdatePostal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    // open input-fields
    setLocked(false);
  };
  // Fix PUT function to update saved address
  return (
    <>
      {/* Button to view Users Address etc... */}
      <Button variant="outline-dark" onClick={handleShow}>
        Mina Uppgifter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Användaruppgifter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <Container fluid="md">
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      variant="secondary"
                      className="rounded-2 text-center"
                    >
                      <strong>Nuvarande Leveransadress</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Namn:</strong> {user.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {user.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Adress:</strong> {user.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Postort:</strong> {user.postal_code} {user.city}
                    </ListGroup.Item>
                  </ListGroup>
                </Container>
              </Col>
            </Row>
          </Container>
          <Form className="mt-4">
            <Form.Group controlId="formName">
              {/* Display Users Name */}
              <Form.Label>
                <strong>Uppdatera din adress nedanför vid behov:</strong>
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Namn"
                value={updateName}
                className="mb-1"
              />
            </Form.Group>
            {/* Display Users Email */}
            <Form.Group controlId="formEmail">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Email"
                value={updateEmail}
                className="mb-1"
              />
            </Form.Group>
            {/* Display Users Address */}
            <Form.Group controlId="formAddress">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Adress"
                value={updateAddress}
                className="mb-1"
              />
            </Form.Group>
            {/* Display Users City */}
            <Form.Group controlId="formCity">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Stad"
                value={updateCity}
                className="mb-1"
              />
            </Form.Group>
            {/* Display Users Postal Code */}
            <Form.Group controlId="formPostalCode">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Postkod"
                value={updatePostal}
                className="mb-1"
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="changeBtn">
              <Button
                size="sm"
                variant="outline-warning"
                onClick={handleEdit}
                className="text-black"
              >
                Uppdatera
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="outline-danger" onClick={handleClose}>
            Stäng
          </Button>
          <Button size="sm" variant="outline-success">
            Spara
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
