import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  ListGroup,
  Form,
  Stack,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// Auth Provider
import { useAuth } from "@provider/AuthProvider";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function CartFinalize() {
  const [userInfo, setUserInfo] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // values for non-registered user
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderCity, setOrderCity] = useState("");
  const [orderPostal, setOrderPostal] = useState("");

  // values for payment
  const [debitCard, setDebitCard] = useState("");
  const [debitCardName, setDebitCardName] = useState("");
  const [debitCardCVV, setDebitCardCVV] = useState("");

  // handle input change of useState values

  // fetch functions from Auth Provider
  const { isAuthenticated, checkAuthentication, fetchUserInfo } = useAuth();
  const { clearCart, handleCheckout, itemCount, total } = useCart();

  // if valid JWT, get saved address, if not, user needs to input delivery address.
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        fetchUserData();
      }
    };
    checkAuth();
  }, []);

  // collect user data from backend, if jwt is correct
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetchUserInfo(token);
      setUserInfo(result);
    } catch (error) {
      console.error("Användaren är ej inloggad.");
    }
  };

  const handleConfirmOrder = async () => {
    // fix backend route N logic
  };

  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h5 className="text-center">Orderbekräftelse</h5>
          </Col>
        </Row>
        <Row>
          {/* Cart Summery of Items & Price */}
          <Col sm={6} className="">
            <Card className="mb-2 mt-2">
              <Card.Body>
                <Card.Text className="text-center">
                  <strong>Varukorg</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Artiklar:</strong> {itemCount}st
                </Card.Text>
                <Card.Text>
                  <strong>Summa:</strong> {total}kr
                </Card.Text>
                {/* Button to clear cart */}
                <div className="d-flex">
                  <div className="d-flex justify-content-end">
                    <Button variant="outline-danger" onClick={clearCart}>
                      Rensa Varukorg
                    </Button>
                    {/* Save Cart Function For Registered Users */}
                    {loggedIn && (
                      <div className="d-flex justify-content-start mx-2">
                        <Button variant="outline-primary">
                          Spara Varukorg
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/*    show saved details about user if loggedIn */}
          {loggedIn && (
            <Col md={6}>
              <Container fluid="md">
                <ListGroup variant="flush">
                  <ListGroup.Item
                    variant="secondary"
                    className="rounded-2 text-center"
                  >
                    Leveransadress
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Namn:</strong> {userInfo.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {userInfo.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Adress:</strong> {userInfo.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Postort:</strong> {userInfo.postal_code}{" "}
                    {userInfo.city}
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  size="sm"
                  as={Link}
                  className="mt-1"
                  variant="outline-dark"
                  to="/private-route"
                >
                  Ändra
                </Button>
              </Container>
            </Col>
          )}

          {/* If user is not loggedIn / verified, show & require delivery-address input. */}
          {!loggedIn && (
            <Col md={6}>
              <Form>
                <Form.Group controlId="formName">
                  {/* Display Users Name */}
                  <Form.Label>
                    <strong>Leveransadress</strong>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Namn"
                    value={orderName}
                    className="mb-1"
                    onChange={(e) => setOrderName(e.target.value)}
                  />
                </Form.Group>
                {/* Display Users Email */}
                <Form.Group controlId="formEmail">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Email"
                    value={orderEmail}
                    className="mb-1"
                    onChange={(e) => setOrderEmail(e.target.value)}
                  />
                </Form.Group>
                {/* Display Users Address */}
                <Form.Group controlId="formAddress">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Adress"
                    value={orderAddress}
                    className="mb-1"
                    onChange={(e) => setOrderAddress(e.target.value)}
                  />
                </Form.Group>
                {/* Display Users City */}
                <Form.Group controlId="formCity">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Stad"
                    value={orderCity}
                    className="mb-1"
                    onChange={(e) => setOrderCity(e.target.value)}
                  />
                </Form.Group>
                {/* Display Users Postal Code */}
                <Form.Group controlId="formPostalCode">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Postkod"
                    value={orderPostal}
                    className="mb-1"
                    onChange={(e) => setOrderPostal(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          )}
        </Row>
        <Row className="pt-2">
          <Col md={3}>
            {/* Card/Payment Input - for all customers. */}
            <Form className="justify-content-end">
              <Form.Label>
                <strong>Betalning</strong>
              </Form.Label>
              <Form.Group>
                <small>Namn</small>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Fullständigt Namn"
                  value={debitCardName}
                  onChange={(e) => setDebitCardName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <small>Kortnummer</small>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Kortnummer"
                  value={debitCard}
                  onChange={(e) => setDebitCard(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <small>CVV</small>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Namn på kortet"
                  value={debitCardCVV}
                  onChange={(e) => setDebitCardCVV(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="pt-2">
                {/* Button to confirm Order */}
                <Button variant="success" className="" onClick={handleCheckout}>
                  Beställ
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}