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
import { Link, useNavigate } from "react-router-dom";
// Auth Provider
import { useAuth } from "@provider/AuthProvider";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function CartFinalize({ isLoggedIn }) {
  const [userInfo, setUserInfo] = useState("");
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

  // values for saveCart function
  const [cartSavedMsg, setCartSavedMsg] = useState("");

  // values for failed order
  const [orderError, setOrderError] = useState("");

  // useNavigate
  const navigate = useNavigate();

  // fetch functions from Auth Provider
  const { isAuthenticated, checkAuthentication, fetchUserInfo } = useAuth();

  // import functions from Cart Provider
  const {
    clearCart,
    handleCheckout,
    itemCount,
    total,
    saveCartToDB,
    checkoutToDB,
  } = useCart();

  /*   // if valid JWT, get saved address, if not, user needs to input delivery address.
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
  }, []);  */

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        await fetchUserData();
      }
    };
    checkAuth();
  }, [isLoggedIn]);

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

  // save cart to database.
  const handleSaveCartToDB = async () => {
    try {
      const userId = userInfo.id;
      const saveCartItems = JSON.parse(localStorage.getItem("cartItems"));
      console.log("SaveCartToDB-User", userId);
      console.log("SaveCartToDB-Cart", saveCartItems);

      await saveCartToDB(userId, saveCartItems);
      setCartSavedMsg(
        "Kundkorgen har sparats i databasen och tas nu bort ur varukorgen."
      );
      localStorage.removeItem("cartItems");
      setTimeout(() => {
        setCartSavedMsg("");
        navigate("/store");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Failed to save cart", error);
    }
  };

  // confirm order and save info to DB
  const handleConfirmOrder = async () => {
    try {
      // collect info about order
      const orderData = {
        // if no userId, value is NULL in DB.
        userId: userInfo.id,
        orderDetails: {
          totalPrice: total,
          deliveryAddress: loggedIn
            ? `${userInfo.name} ${userInfo.address} ${userInfo.city} ${userInfo.postal_code}`
            : `${orderName} ${orderAddress} ${orderCity} ${orderEmail}`,
          products: JSON.parse(localStorage.getItem("cartItems")),
        },
        cardDetails: {
          cardNumber: debitCard,
          cardName: debitCardName,
          cvv: debitCardCVV,
        },
      };
      await checkoutToDB(orderData);
      // show message and clear cart if successful submit
      handleCheckout();
    } catch (error) {
      console.error("Failed to confirm order", error);
      setOrderError("Tyvärr ordern kunde inte slutföras just nu.");
      setTimeout(() => {
        setOrderError("");
      }, 3000);
    }
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
          <Col sm={6}>
            <Card className="mb-2 mt-2 ">
              <Card.Header className="text-center border-0 list-group-header text-white">
                <strong>Varukorg</strong>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-center border-0 list-group-header text-white"></Card.Text>
                <Card.Text className="text-white">
                  <strong className="text-white">Artiklar: </strong> {itemCount}
                  <strong className="text-white"> st</strong>
                </Card.Text>
                <Card.Text className="text-white">
                  <strong className="text-white">Summa: </strong> {total}
                  <strong className="text-white"> kr</strong>
                </Card.Text>
                {/* Button to clear cart */}
                <div className="d-flex">
                  <Button variant="outline-danger" onClick={clearCart}>
                    Rensa Varukorg
                  </Button>

                  {/* Save Cart Function For Registered Users */}
                  {isLoggedIn && (
                    <div className="d-flex justify-content-start mx-2">
                      <div>
                        <Button
                          variant="outline-primary"
                          onClick={handleSaveCartToDB}
                        >
                          Spara Varukorg
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  {cartSavedMsg && (
                    <p className="text-success">{cartSavedMsg}</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/*    show saved details about user if loggedIn */}
          {isLoggedIn && (
            <Col md={6}>
              <Container className="mb-2 mt-2">
                <ListGroup>
                  <ListGroup.Item
                    disabled
                    className="rounded-2 text-center list-group-header text-white"
                  >
                    Leveransadress
                  </ListGroup.Item>
                  <ListGroup.Item disabled>
                    <strong>Namn:</strong> {userInfo.name}
                  </ListGroup.Item>
                  <ListGroup.Item disabled>
                    <strong>Email:</strong> {userInfo.email}
                  </ListGroup.Item>
                  <ListGroup.Item disabled>
                    <strong>Adress:</strong> {userInfo.address}
                  </ListGroup.Item>
                  <ListGroup.Item disabled>
                    <strong>Postort:</strong> {userInfo.postal_code}{" "}
                    {userInfo.city}
                  </ListGroup.Item>
                </ListGroup>
              </Container>
            </Col>
          )}

          {/* If user is not loggedIn / verified, show & require delivery-address input. */}
          {!isLoggedIn && (
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
          <Col>
            {/* Card/Payment Input - for all customers. */}
            <Card>
              <Card.Header className="text-center border-0 list-group-header text-white">
                <strong>Betalning</strong>
              </Card.Header>

              <Form className="justify-content-end p-3">
                <Form.Group className="">
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
                    maxLength={16}
                  />
                </Form.Group>
                <Form.Group>
                  <small>CVV</small>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="CVV Kontroll Nummer"
                    value={debitCardCVV}
                    onChange={(e) => setDebitCardCVV(e.target.value)}
                    maxLength={3}
                  />
                </Form.Group>
                <Form.Group className="p-3  d-flex justify-content-end">
                  {/* Button to confirm Order */}
                  <Button
                    variant="success"
                    className=""
                    onClick={handleConfirmOrder}
                  >
                    Beställ
                  </Button>
                  <div>
                    {orderError && <p className="text-danger">{orderError}</p>}
                  </div>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
