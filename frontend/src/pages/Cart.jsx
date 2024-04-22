import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FloatingLabel,
  Form,
  Stack,
  Button,
  Col,
  Row,
  Container,
} from "react-bootstrap";

// import components
import CartProduct from "@cart/CartProduct";
import CartFinalize from "@cart/CartFinalize";

// Auth Provider
import { useAuth } from "@provider/AuthProvider";
// Cart State
import { useCart } from "@provider/CartProvider";

export default function Cart() {
  // import from CartProvider
  const { cartItems, checkout, clearCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // import from AuthProvider
  const { isAuthenticated, checkAuthentication } = useAuth();

  // validate JWT of user, if missing send to /login, if valid, fetch user data.
  /*   useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []); */

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      setIsLoggedIn(isAuthenticated);
    };
    checkAuth();
  }, []);

  return (
    <>
      <Container className="p-4">
        {/* Header of Cart */}
        <Row>
          <Col className="d-flex justify-content-center">
            <h5>Kundvagn</h5>
          </Col>
        </Row>
        {/* Display Checkout-Message at Order Submit */}
        <Row>
          {checkout && (
            <Col>
              <h6>Tack för ditt köp!</h6>
              <p>
                Din order kommer att skicka omgående. Leverans sker inom 2-5
                dagar.
              </p>
              <Link to="/store">
                <Button variant="success" size="sm" onClick={clearCart}>
                  Fortsätt Handla
                </Button>
              </Link>
            </Col>
          )}
        </Row>
        {/* Display Products in Cart */}
        <Row>
          <Col>
            {cartItems.length === 0 ? (
              <h6 className="text-center">Kundvagnen är tom...</h6>
            ) : (
              <div>
                {cartItems.map((product) => (
                  <CartProduct key={product.id} product={product} />
                ))}
              </div>
            )}
          </Col>
        </Row>
        {/* Checkout Display */}
        <Row>
          {cartItems.length > 0 && (
            <Col xs={12} sm={10}>
              <CartFinalize isLoggedIn={isLoggedIn} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
