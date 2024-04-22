import React, { useEffect, useState } from "react";
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
  Card,
} from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa6";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function UserDetails({ user }) {
  // import function from Cart Provider
  const { updateUserInfo } = useCart();

  // Success & Error Message Display In Modal
  const [updateOutcome, setUpdateOutCome] = useState(null);
  // state for modal
  const [show, setShow] = useState(false);
  // open modal
  const handleShow = () => setShow(true);

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updatePostal, setUpdatePostal] = useState("");

  const handleClose = () => {
    setUpdateName("");
    setUpdateEmail("");
    setUpdateAddress("");
    setUpdateCity("");
    setUpdatePostal("");
    setUpdateOutCome("");
    setShow(false);
  };

  // handle update of user information
  const handleUpdate = async () => {
    const userId = user.id;
    try {
      // no empty values
      if (
        !updateName ||
        !updateEmail ||
        !updateAddress ||
        !updateCity ||
        !updatePostal
      ) {
        throw new Error("Alla fält måste fyllas i.");
        setUpdateOutCome("noInput");

        setTimeout(() => {
          setUpdateOutCome("");
        }, 3000);
      }
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
              variant={
                updateOutcome === "success"
                  ? "success"
                  : updateOutcome === "noInput"
                  ? "warning"
                  : "danger"
              }
              onClose={() => setUpdateOutCome(null)}
              dismissible
            >
              {updateOutcome === "success"
                ? "Uppdatering lyckad."
                : updateOutcome === "noInput"
                ? "Fyll i alla fält."
                : "Misslyckad uppdatering."}
            </Alert>
          )}
          <Container className="p-4">
            <Card className="p-2 card-body">
              <Form className="mt-4">
                <Form.Label>
                  <strong className="fs-5">
                    Uppdatera din adress nedanför vid behov
                  </strong>
                </Form.Label>
                {/* Display User Saved Info */}
                <Form.Label>
                  Alla fält måste innehålla information vid uppdatering.
                </Form.Label>

                {/* Display Users Name */}
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Namn"
                  value={updateName}
                  className="mb-1"
                  onChange={(e) => setUpdateName(e.target.value)}
                />

                {/* Display Users Email */}
                <Form.Group controlId="updateEmail" className="d-flex">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Email"
                    value={updateEmail}
                    className="mb-1"
                    onChange={(e) => setUpdateEmail(e.target.value)}
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
            </Card>
          </Container>
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
