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
      // add logger
    }
  };

  // save cart to database.
  const handleSaveCartToDB = async () => {
    try {
      const userId = userInfo.id;
      const saveCartItems = JSON.parse(localStorage.getItem("cartItems"));

      await saveCartToDB(userId, saveCartItems);
      setCartSavedMsg(
        "Varukorgen har sparats i databasen och tas nu bort ur varukorgen."
      );
      localStorage.removeItem("cartItems");
      setTimeout(() => {
        setCartSavedMsg("");
        navigate("/store");
        window.location.reload();
      }, 3000);
    } catch (error) {
      // add logger
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
      // add logger
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
            <h5 className="text-center fs-3 fw-bold">Orderbekräftelse</h5>
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
                <Card.Text className="text-white">
                  <strong className="text-white">Artiklar: </strong> {itemCount}
                  <strong className="text-white"> st</strong>
                </Card.Text>
                <Card.Text className="text-white">
                  <strong className="text-white">Summa: </strong>{" "}
                  {Math.round(total)}
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
                  {cartSavedMsg && <p className="text-white">{cartSavedMsg}</p>}
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
                  <ListGroup.Item disabled className="text-white">
                    <strong className="text-white">Namn:</strong>{" "}
                    {userInfo.name}
                  </ListGroup.Item>
                  <ListGroup.Item disabled className="text-white">
                    <strong className="text-white">Email:</strong>{" "}
                    {userInfo.email}
                  </ListGroup.Item>
                  <ListGroup.Item disabled className="text-white">
                    <strong className="text-white">Adress:</strong>{" "}
                    {userInfo.address}
                  </ListGroup.Item>
                  <ListGroup.Item disabled className="text-white">
                    <strong className="text-white">Postort:</strong>{" "}
                    {userInfo.postal_code} {userInfo.city}
                  </ListGroup.Item>
                </ListGroup>
              </Container>
            </Col>
          )}

          {/* If user is not loggedIn / verified, show & require delivery-address input. */}
          {!isLoggedIn && (
            <Col md={6}>
              <Card className="mb-2 mt-2">
                <Card.Header className="text-center border-0 list-group-header text-white">
                  <strong>Leveransadress</strong>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Stack direction="horizontal" gap={3}>
                      {/* Display Users Name */}
                      <Form.Floating>
                        <Form.Control
                          id="guestName"
                          size="sm"
                          type="text"
                          autoComplete="name"
                          placeholder="Namn"
                          value={orderName}
                          className="mb-2 w-100"
                          onChange={(e) => setOrderName(e.target.value)}
                        />
                        <label htmlFor="guestName">Fullständigt Namn</label>
                      </Form.Floating>
                      {/* Display Users Email */}
                      <Form.Floating>
                        <Form.Control
                          id="guestEmail"
                          size="sm"
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          value={orderEmail}
                          className="mb-2 w-100"
                          onChange={(e) => setOrderEmail(e.target.value)}
                        />
                        <label htmlFor="guestEmail">E-post</label>
                      </Form.Floating>
                    </Stack>
                    {/* Stack Address, city and postal-code */}
                    <Stack direction="horizontal" gap={3}>
                      {/* Display Users Address */}
                      <Form.Floating>
                        <Form.Control
                          id="guestAddress"
                          size="sm"
                          type="text"
                          placeholder="Adress"
                          autoComplete="address-line1"
                          value={orderAddress}
                          className="mb-2"
                          onChange={(e) => setOrderAddress(e.target.value)}
                        />
                        <label htmlFor="guestAddress">Gatunamn</label>
                      </Form.Floating>

                      {/* Display Users City */}
                      <Form.Floating>
                        <Form.Control
                          id="guestCity"
                          size="sm"
                          type="text"
                          placeholder="Stad"
                          autoComplete="address-level2"
                          value={orderCity}
                          className="mb-2"
                          onChange={(e) => setOrderCity(e.target.value)}
                        />
                        <label htmlFor="guestCity">Stad</label>
                      </Form.Floating>

                      {/* Display Users Postal Code */}
                      <Form.Floating>
                        <Form.Control
                          id="guestPostalCode"
                          size="sm"
                          type="text"
                          placeholder="Postkod"
                          autoComplete="postal-code"
                          value={orderPostal}
                          className="mb-2"
                          onChange={(e) => setOrderPostal(e.target.value)}
                        />
                        <label htmlFor="guestPostalCode">Postkod</label>
                      </Form.Floating>
                    </Stack>
                  </Form>
                </Card.Body>
              </Card>
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
              <div className="d-flex justify-content-start mt-2">
                {/* visa logo svg */}
                <div className="">
                  <svg
                    enable-background="new 0 0 780 500"
                    height="35"
                    viewBox="0 0 780 500"
                    width="102"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m293.2 348.73 33.359-195.76h53.358l-33.384 195.76zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-.271 30.088 3.534 39.936 7.5l4.781 2.259zm137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293zm-363.3-126.41-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.39-56.524-.001"
                      fill="#0e4595"
                    />
                    <path
                      d="m146.92 152.96h-86.041l-.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528"
                      fill="#f2ae14"
                    />
                  </svg>
                </div>
                {/* mastercard logo svg */}
                <div className="">
                  <svg
                    enable-background="new 0 0 780 500"
                    height="35"
                    viewBox="0 0 780 500"
                    width="102"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m449.01 250c0 99.143-80.371 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.371 179.51 179.5"
                      fill="#d9222a"
                    />
                    <path
                      d="m510.49 70.496c-46.379 0-88.643 17.596-120.5 46.467-6.49 5.889-12.548 12.237-18.125 18.996h36.267c4.965 6.037 9.536 12.387 13.685 19.012h-63.635c-3.827 6.122-7.281 12.469-10.342 19.008h84.313c2.894 6.185 5.431 12.53 7.601 19.004h-99.513c-2.09 6.234-3.832 12.58-5.217 19.008h109.94c2.689 12.49 4.045 25.231 4.042 38.008 0 19.935-3.254 39.112-9.254 57.021h-99.513c2.164 6.477 4.7 12.824 7.596 19.008h84.316c-3.063 6.541-6.519 12.889-10.347 19.013h-63.625c4.147 6.62 8.719 12.966 13.685 18.996h36.259c-5.57 6.772-11.63 13.127-18.13 19.013 31.857 28.866 74.117 46.454 120.5 46.454 99.139 0 179.51-80.361 179.51-179.5 0-99.129-80.371-179.5-179.51-179.5"
                      fill="#ee9f2d"
                    />
                    <path d="m666.07 350.06c0-3.199 2.592-5.801 5.796-5.801s5.796 2.602 5.796 5.801-2.592 5.801-5.796 5.801-5.796-2.602-5.796-5.801zm5.796 4.408c2.434-.001 4.407-1.974 4.408-4.408 0-2.432-1.971-4.402-4.402-4.404h-.006c-2.429-.003-4.4 1.963-4.404 4.391v.014c-.002 2.433 1.968 4.406 4.4 4.408.001-.001.003-.001.004-.001zm-.783-1.86h-1.187v-5.096h2.149c.45 0 .908 0 1.305.254.413.279.646.771.646 1.279 0 .571-.338 1.104-.884 1.312l.938 2.25h-1.315l-.779-2.017h-.871zm0-2.89h.658c.246 0 .505.021.726-.1.195-.125.296-.359.296-.584-.005-.209-.112-.402-.288-.518-.207-.129-.536-.101-.758-.101h-.634zm-443.5-80.063c-2.046-.238-2.945-.301-4.35-.301-11.046 0-16.638 3.787-16.638 11.268 0 4.611 2.729 7.545 6.987 7.545 7.939 0 13.659-7.559 14.001-18.512zm14.171 32.996h-16.146l.371-7.676c-4.926 6.065-11.496 8.949-20.426 8.949-10.563 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.541 34.217-28.541 2.208 0 5.042.199 7.941.57.604-2.441.763-3.488.763-4.801 0-4.908-3.396-6.737-12.5-6.737-9.533-.108-17.396 2.271-20.625 3.333.204-1.229 2.7-16.659 2.7-16.659 9.712-2.846 16.116-3.917 23.325-3.917 16.732 0 25.596 7.513 25.579 21.712.033 3.805-.597 8.5-1.579 14.671-1.691 10.734-5.32 33.721-5.816 39.325zm-62.158 0h-19.487l11.162-69.997-24.925 69.997h-13.279l-1.642-69.597-11.733 69.597h-18.242l15.237-91.056h28.021l1.7 50.968 17.092-50.968h31.167zm354.97-32.996c-2.037-.238-2.941-.301-4.342-.301-11.041 0-16.634 3.787-16.634 11.268 0 4.611 2.726 7.545 6.983 7.545 7.94 0 13.664-7.559 13.993-18.512zm14.184 32.996h-16.146l.366-7.676c-4.926 6.065-11.5 8.949-20.422 8.949-10.565 0-17.8-8.25-17.8-20.229 0-18.024 12.588-28.541 34.213-28.541 2.208 0 5.037.199 7.934.57.604-2.441.763-3.488.763-4.801 0-4.908-3.392-6.737-12.496-6.737-9.533-.108-17.387 2.271-20.629 3.333.204-1.229 2.709-16.659 2.709-16.659 9.712-2.846 16.112-3.917 23.313-3.917 16.74 0 25.604 7.513 25.587 21.712.032 3.805-.597 8.5-1.579 14.671-1.684 10.734-5.321 33.721-5.813 39.325zm-220.39-1.125c-5.333 1.679-9.491 2.398-14 2.398-9.962 0-15.399-5.725-15.399-16.267-.142-3.271 1.433-11.88 2.671-19.737 1.125-6.917 8.449-50.529 8.449-50.529h19.371l-2.263 11.208h11.699l-2.642 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.816 2.037 5.483 6.671 5.483 2.221 0 3.94-.227 5.254-.7zm59.392-.6c-6.654 2.034-13.075 3.017-19.879 3-21.684-.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.899-43.947 15.971 0 26.171 10.433 26.171 26.796 0 5.429-.7 10.729-2.388 18.212h-38.574c-1.305 10.741 5.57 15.217 16.837 15.217 6.935 0 13.188-1.429 20.142-4.663zm-10.888-43.9c.107-1.543 2.055-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217zm-123.42-5.017c0 9.367 4.542 15.826 14.842 20.676 7.892 3.709 9.112 4.81 9.112 8.17 0 4.617-3.479 6.701-11.191 6.701-5.813 0-11.221-.908-17.458-2.922 0 0-2.563 16.321-2.68 17.102 4.43.967 8.38 1.861 20.279 2.19 20.563 0 30.059-7.829 30.059-24.75 0-10.175-3.976-16.146-13.737-20.634-8.171-3.75-9.108-4.587-9.108-8.045 0-4.004 3.237-6.046 9.537-6.046 3.825 0 9.05.408 14 1.112l2.775-17.175c-5.046-.8-12.696-1.442-17.15-1.442-21.801.001-29.347 11.388-29.28 25.063m229.09-23.116c5.412 0 10.458 1.421 17.412 4.921l3.188-19.763c-2.854-1.121-12.904-7.7-21.417-7.7-13.041 0-24.065 6.471-31.82 17.15-11.309-3.746-15.958 3.825-21.657 11.367l-5.063 1.179c.383-2.483.729-4.95.612-7.446h-17.896c-2.445 22.917-6.778 46.128-10.171 69.075l-.884 4.976h19.496c3.254-21.143 5.037-34.68 6.121-43.842l7.341-4.084c1.097-4.078 4.529-5.458 11.417-5.291-.926 5.008-1.389 10.091-1.383 15.184 0 24.225 13.07 39.308 34.05 39.308 5.404 0 10.041-.712 17.221-2.658l3.43-20.759c-6.458 3.181-11.759 4.677-16.559 4.677-11.329 0-18.184-8.363-18.184-22.185 0-20.051 10.196-34.109 24.746-34.109" />
                    <path
                      d="m185.21 297.24h-19.491l11.171-69.988-24.926 69.988h-13.283l-1.642-69.588-11.733 69.588h-18.241l15.237-91.042h28.021l.788 56.362 18.904-56.362h30.267z"
                      fill="#fff"
                    />
                    <path d="m647.52 211.6-4.321 26.309c-5.329-7.013-11.054-12.088-18.612-12.088-9.833 0-18.783 7.455-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-.004.067c.658-6.134.921-9.875.862-11.146h-17.9c-2.438 22.917-6.771 46.128-10.157 69.075l-.893 4.976h19.492c2.633-17.096 4.648-31.291 6.133-42.551 6.658-6.016 9.992-11.266 16.721-10.916-2.979 7.205-4.725 15.503-4.725 24.017 0 18.513 9.366 30.725 23.533 30.725 7.142 0 12.621-2.462 17.967-8.171l-.913 6.884h18.435l14.842-91.042zm-24.371 73.941c-6.634 0-9.983-4.908-9.983-14.596 0-14.555 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.509.001 14.679-6.37 24.962-15.449 24.962z" />
                    <path
                      d="m233.19 264.26c-2.042-.236-2.946-.299-4.346-.299-11.046 0-16.634 3.787-16.634 11.266 0 4.604 2.729 7.547 6.979 7.547 7.947-.001 13.668-7.559 14.001-18.514zm14.178 32.984h-16.146l.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.805-8.25-17.805-20.229 0-18.032 12.592-28.542 34.217-28.542 2.208 0 5.042.2 7.938.571.604-2.441.763-3.487.763-4.808 0-4.909-3.392-6.729-12.496-6.729-9.537-.108-17.396 2.271-20.629 3.321.204-1.225 2.7-16.637 2.7-16.637 9.708-2.858 16.12-3.929 23.32-3.929 16.737 0 25.604 7.517 25.588 21.704.029 3.821-.604 8.513-1.584 14.675-1.687 10.724-5.319 33.724-5.812 39.316zm261.38-88.592-3.191 19.767c-6.95-3.496-12-4.92-17.407-4.92-14.551 0-24.75 14.058-24.75 34.106 0 13.821 6.857 22.181 18.184 22.181 4.8 0 10.096-1.492 16.554-4.675l-3.421 20.75c-7.184 1.957-11.816 2.67-17.225 2.67-20.977 0-34.051-15.084-34.051-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507.001 18.561 3.609 21.419 4.73m31.443 55.608c-2.041-.236-2.941-.299-4.347-.299-11.041 0-16.633 3.787-16.633 11.266 0 4.604 2.729 7.547 6.983 7.547 7.938-.001 13.663-7.559 13.997-18.514zm14.178 32.984h-16.15l.371-7.663c-4.925 6.054-11.5 8.95-20.421 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.596-28.542 34.212-28.542 2.213 0 5.042.2 7.941.571.601-2.441.763-3.487.763-4.808 0-4.909-3.393-6.729-12.495-6.729-9.533-.108-17.396 2.271-20.63 3.321.204-1.225 2.704-16.637 2.704-16.637 9.709-2.858 16.116-3.929 23.316-3.929 16.741 0 25.604 7.517 25.583 21.704.033 3.821-.596 8.513-1.579 14.675-1.682 10.724-5.323 33.724-5.811 39.316zm-220.39-1.121c-5.338 1.679-9.496 2.408-14 2.408-9.962 0-15.399-5.726-15.399-16.268-.138-3.279 1.438-11.88 2.675-19.736 1.12-6.926 8.445-50.534 8.445-50.534h19.368l-2.26 11.212h9.941l-2.646 17.788h-9.975c-2.25 14.092-5.463 31.62-5.496 33.95 0 3.83 2.041 5.482 6.671 5.482 2.221 0 3.938-.216 5.254-.691zm59.391-.592c-6.65 2.033-13.079 3.012-19.879 3-21.685-.021-32.987-11.346-32.987-33.033 0-25.321 14.379-43.95 33.899-43.95 15.971 0 26.171 10.429 26.171 26.8 0 5.434-.7 10.733-2.384 18.212h-38.574c-1.306 10.741 5.569 15.222 16.837 15.222 6.93 0 13.188-1.435 20.138-4.677zm-10.891-43.912c.116-1.538 2.06-13.217-9.013-13.217-6.167 0-10.579 4.717-12.375 13.217zm-123.42-5.005c0 9.367 4.542 15.818 14.842 20.675 7.892 3.709 9.112 4.812 9.112 8.172 0 4.616-3.483 6.699-11.188 6.699-5.816 0-11.225-.908-17.467-2.921 0 0-2.554 16.321-2.671 17.101 4.421.967 8.375 1.85 20.275 2.191 20.566 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.737-20.637-8.167-3.759-9.113-4.584-9.113-8.046 0-4 3.246-6.059 9.542-6.059 3.821 0 9.046.421 14.004 1.125l2.771-17.179c-5.042-.8-12.692-1.441-17.146-1.441-21.804 0-29.346 11.379-29.283 25.066m398.45 50.63h-18.438l.917-6.893c-5.347 5.717-10.825 8.18-17.968 8.18-14.166 0-23.528-12.213-23.528-30.726 0-24.63 14.521-45.392 31.708-45.392 7.559 0 13.279 3.087 18.604 10.096l4.325-26.308h19.221zm-28.746-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.629-14.509-10.325-14.509-8.837 0-15.115 10.315-15.115 24.875-.001 9.686 3.357 14.587 9.99 14.587zm-56.842-56.929c-2.441 22.917-6.773 46.13-10.162 69.063l-.892 4.976h19.491c6.972-45.275 8.658-54.117 19.588-53.009 1.742-9.267 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675.471-3.788 1.333-7.467 1.162-11.225zm-160.42 0c-2.446 22.917-6.779 46.13-10.167 69.063l-.888 4.976h19.5c6.963-45.275 8.646-54.117 19.57-53.009 1.75-9.267 4.991-17.383 7.399-21.479-8.154-1.7-12.717 2.913-18.679 11.675.471-3.788 1.324-7.467 1.162-11.225zm254.57 68.241c-.004-3.199 2.586-5.795 5.784-5.799h.012c3.197-.004 5.793 2.586 5.796 5.783v.016c-.001 3.201-2.595 5.795-5.796 5.797-3.201-.002-5.795-2.596-5.796-5.797zm5.796 4.405c2.431.002 4.402-1.969 4.403-4.399v-.004c.003-2.433-1.968-4.406-4.399-4.408h-.004c-2.435.001-4.407 1.974-4.408 4.408.002 2.432 1.975 4.403 4.408 4.403zm-.784-1.871h-1.188v-5.082h2.153c.446 0 .909.009 1.296.254.417.283.654.767.654 1.274 0 .575-.337 1.112-.888 1.317l.941 2.236h-1.32l-.779-2.009h-.87zm0-2.879h.653c.246 0 .513.019.729-.1.196-.125.296-.361.296-.588-.009-.21-.114-.404-.287-.523-.204-.117-.542-.084-.763-.084h-.629z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                {/* paypal logo svg */}
                <div className="">
                  <svg
                    enable-background="new 0 0 780 500"
                    height="35"
                    viewBox="0 0 780 500"
                    width="102"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m168.38 169.35c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.215l-21.264 133.48c-.221 1.311.107 2.51.981 3.6.869 1.092 1.962 1.635 3.271 1.635h24.864c4.361 0 6.758-2.068 7.198-6.215l5.888-35.986c.215-1.744.982-3.162 2.291-4.254 1.308-1.09 2.944-1.803 4.907-2.129 1.963-.324 3.814-.488 5.562-.488 1.743 0 3.814.111 6.217.328 2.397.217 3.925.324 4.58.324 18.756 0 33.478-5.285 44.167-15.867 10.684-10.576 16.032-25.242 16.032-44.004 0-12.868-4.203-22.191-12.598-27.974zm-26.989 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.599-19.629 3.599l-10.797.326 5.563-35.007c.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.801 3.924 15.869z"
                      fill="#003087"
                    />
                    <path
                      d="m720.79 160.68h-24.207c-2.406 0-3.822 1.2-4.254 3.601l-21.266 136.1-.328.654c0 1.096.436 2.127 1.311 3.109.867.98 1.963 1.471 3.27 1.471h21.596c4.137 0 6.428-2.068 6.871-6.215l21.264-133.81v-.325c-.001-3.055-1.423-4.581-4.257-4.581z"
                      fill="#009cde"
                    />
                    <path
                      d="m428.31 213.36c0-1.088-.438-2.126-1.305-3.105-.875-.981-1.857-1.475-2.945-1.475h-25.191c-2.404 0-4.367 1.096-5.891 3.271l-34.678 51.039-14.395-49.074c-1.096-3.487-3.492-5.236-7.197-5.236h-24.541c-1.093 0-2.074.492-2.941 1.475-.875.979-1.309 2.019-1.309 3.105 0 .439 2.127 6.871 6.379 19.303 4.252 12.436 8.832 25.85 13.74 40.246 4.908 14.393 7.469 22.031 7.688 22.896-17.886 24.432-26.825 37.518-26.825 39.26 0 2.838 1.415 4.254 4.253 4.254h25.191c2.398 0 4.36-1.088 5.89-3.27l83.427-120.4c.433-.432.65-1.192.65-2.29z"
                      fill="#003087"
                    />
                    <path
                      d="m662.89 208.78h-24.865c-3.057 0-4.904 3.6-5.559 10.799-5.678-8.722-16.031-13.089-31.084-13.089-15.703 0-29.064 5.89-40.076 17.668-11.016 11.778-16.521 25.632-16.521 41.552 0 12.871 3.762 23.121 11.285 30.752 7.525 7.639 17.611 11.451 30.266 11.451 6.324 0 12.758-1.311 19.301-3.926 6.543-2.617 11.664-6.105 15.379-10.469 0 .219-.223 1.197-.654 2.941-.441 1.748-.656 3.061-.656 3.926 0 3.494 1.414 5.234 4.254 5.234h22.576c4.139 0 6.541-2.068 7.193-6.215l13.416-85.39c.215-1.31-.111-2.507-.982-3.599-.877-1.088-1.965-1.635-3.273-1.635zm-42.694 64.454c-5.562 5.453-12.27 8.178-20.121 8.178-6.328 0-11.449-1.742-15.377-5.234-3.928-3.482-5.891-8.281-5.891-14.395 0-8.064 2.727-14.886 8.182-20.447 5.445-5.562 12.213-8.342 20.283-8.342 6.102 0 11.174 1.799 15.213 5.396 4.031 3.6 6.055 8.562 6.055 14.889-.002 7.851-2.783 14.505-8.344 19.955z"
                      fill="#009cde"
                    />
                    <path
                      d="m291.23 208.78h-24.865c-3.058 0-4.908 3.6-5.563 10.799-5.889-8.722-16.25-13.089-31.081-13.089-15.704 0-29.065 5.89-40.078 17.668-11.016 11.778-16.521 25.632-16.521 41.552 0 12.871 3.763 23.121 11.288 30.752 7.525 7.639 17.61 11.451 30.262 11.451 6.104 0 12.433-1.311 18.975-3.926 6.543-2.617 11.778-6.105 15.704-10.469-.875 2.615-1.309 4.906-1.309 6.867 0 3.494 1.417 5.234 4.253 5.234h22.574c4.141 0 6.543-2.068 7.198-6.215l13.413-85.39c.215-1.31-.111-2.507-.981-3.599-.873-1.088-1.962-1.635-3.269-1.635zm-42.695 64.616c-5.563 5.35-12.382 8.016-20.447 8.016-6.329 0-11.4-1.742-15.214-5.234-3.819-3.482-5.726-8.281-5.726-14.395 0-8.064 2.725-14.886 8.18-20.447 5.449-5.562 12.211-8.343 20.284-8.343 6.104 0 11.175 1.8 15.214 5.397 4.032 3.6 6.052 8.562 6.052 14.889-.001 8.07-2.781 14.779-8.343 20.117z"
                      fill="#003087"
                    />
                    <path
                      d="m540.04 169.35c-8.398-5.774-19.355-8.668-32.879-8.668h-52.02c-4.363 0-6.764 2.073-7.197 6.215l-21.266 133.48c-.221 1.311.107 2.51.982 3.6.865 1.092 1.961 1.635 3.27 1.635h26.826c2.617 0 4.361-1.416 5.236-4.252l5.889-37.949c.217-1.744.98-3.162 2.291-4.254 1.309-1.09 2.943-1.803 4.908-2.129 1.961-.324 3.812-.488 5.561-.488 1.744 0 3.814.111 6.215.328 2.398.217 3.93.324 4.58.324 18.76 0 33.479-5.285 44.168-15.867 10.688-10.576 16.031-25.242 16.031-44.004.001-12.868-4.2-22.192-12.595-27.974zm-33.533 53.819c-4.799 3.271-11.998 4.906-21.592 4.906l-10.471.328 5.562-35.008c.432-2.396 1.85-3.598 4.252-3.598h5.887c4.799 0 8.615.219 11.455.654 2.83.438 5.561 1.799 8.178 4.088 2.619 2.291 3.926 5.619 3.926 9.979 0 9.164-2.402 15.377-7.197 18.651z"
                      fill="#009cde"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="fs-5 fw-bold text-black text-center">
                  Skolprojekt. Lämna inga riktiga uppgifter.
                </p>
              </div>

              <Form className="justify-content-end p-3">
                <Form.Group className="">
                  <small>Namn</small>
                  <Form.Control
                    id="paymentName"
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
                    id="paymentCard"
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
                    id="paymentCVV"
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
