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
  Alert,
} from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa6";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function UserDetails({ user }) {
  const [show, setShow] = useState(false);
  const [locked, setLocked] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updatePostal, setUpdatePostal] = useState("");

  // Success & Error Message Display In Modal
  const [updateOutcome, setUpdateOutCome] = useState(null);

  // import function from Cart Provider
  const { updateUserInfo } = useCart();

  const handleClose = () => {
    setUpdateName("");
    setUpdateEmail("");
    setUpdateAddress("");
    setUpdateCity("");
    setUpdatePostal("");
    setUpdateOutCome("");
    setLocked(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  // handle update of user information
  const handleUpdate = async () => {
    const userId = user.id;
    try {
      // create object for backend, if empty use existing value
      const userDetails = {
        name: updateName,
        email: updateEmail,
        address: updateAddress,
        city: updateCity,
        postalCode: updatePostal,
      };
      await updateUserInfo(userId, userDetails);
      console.log("User information updated.");
      setUpdateOutCome("success");
      setLocked(true);
      setTimeout(() => {
        setUpdateOutCome("");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Failed to update user information", error);
      setUpdateOutCome("error");
      setTimeout(() => {
        setUpdateOutCome("");
      }, 3000);
    }
  };

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
          {/* Display Success or Error Message for updating user credentials */}
          {updateOutcome && (
            <Alert
              variant={updateOutcome === "success" ? "success" : "danger"}
              onClose={() => setUpdateOutCome(null)}
              dismissible
            >
              {updateOutcome === "success"
                ? "Uppdatering lyckad."
                : "Misslyckad uppdatering."}
            </Alert>
          )}
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
            <Form.Label>
              <strong>Uppdatera din adress nedanför vid behov:</strong>
            </Form.Label>
            <Form.Label>
              <small>
                Checkbox för att behålla nuvarande värden
                <FaArrowRight className="mx-2" />
              </small>
            </Form.Label>
            <Form.Group controlId="updateName" className="d-flex">
              {/* Display Users Name */}
              <Form.Control
                size="sm"
                type="text"
                placeholder="Namn"
                value={updateName}
                className="mb-1"
                onChange={(e) => setUpdateName(e.target.value)}
                disabled={updateName === user.name}
              />
              <Form.Check
                size="sm"
                type="checkbox"
                className="mx-1"
                onChange={() => setUpdateName(user.name)}
                disabled={updateName === user.name}
              />
            </Form.Group>
            {/* Display Users Email */}
            <Form.Group controlId="updateEmail" className="d-flex">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Email"
                value={updateEmail}
                className="mb-1"
                onChange={(e) => setUpdateEmail(e.target.value)}
                disabled={updateEmail === user.email}
              />
              <Form.Check
                size="sm"
                type="checkbox"
                className="mx-1"
                onChange={() => setUpdateEmail(user.email)}
                disabled={updateEmail === user.email}
              />
            </Form.Group>
            {/* Display Users Address */}
            <Form.Group controlId="updateAddress" className="d-flex">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Adress"
                value={updateAddress}
                className="mb-1"
                onChange={(e) => setUpdateAddress(e.target.value)}
                disabled={updateAddress === user.address}
              />
              <Form.Check
                size="sm"
                type="checkbox"
                className="mx-1"
                onChange={() => setUpdateAddress(user.address)}
                disabled={updateAddress === user.address}
              />
            </Form.Group>
            {/* Display Users City */}
            <Form.Group controlId="updateCity" className="d-flex">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Stad"
                value={updateCity}
                className="mb-1"
                onChange={(e) => setUpdateCity(e.target.value)}
                disabled={updateCity === user.city}
              />
              <Form.Check
                size="sm"
                type="checkbox"
                className="mx-1"
                onChange={() => setUpdateCity(user.city)}
                disabled={updateCity === user.city}
              />
            </Form.Group>
            {/* Display Users Postal Code */}
            <Form.Group controlId="updatePostalCode" className="d-flex">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Postkod"
                value={updatePostal}
                className="mb-1"
                onChange={(e) => setUpdatePostal(e.target.value)}
                disabled={updatePostal === user.postal_code}
              />
              <Form.Check
                size="sm"
                type="checkbox"
                className="mx-1"
                onChange={() => setUpdatePostal(user.postal_code)}
                disabled={updatePostal === user.postal_code}
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="changeBtn">
              <Button
                size="sm"
                variant="outline-warning"
                onClick={handleUpdate}
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
