import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FloatingLabel,
  Form,
  Stack,
  Button,
  Col,
  Row,
  Container,
} from "react-bootstrap";

import CheckoutCart from "../components/CheckoutCart";
import CartProduct from "../components/CartProduct";
// Cart State

import { useCart } from "../provider/CartProvider";

export default function Cart() {
  const { cartItems, checkout, clearCart } = useCart();
  return (
    <>
      <Container className="p-4">
        {/* Header of Cart */}
        <Row>
          <Col className="d-flex justify-content-center">
            <h5>
              Kundvagn
              {/* <span className="text-success p-2">({cartItems.length})</span> */}
            </h5>
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
          <Col>{cartItems.length > 0 && <CheckoutCart />}</Col>
        </Row>
      </Container>
    </>
  );
}
