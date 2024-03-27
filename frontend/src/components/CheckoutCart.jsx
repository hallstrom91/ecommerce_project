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

// JWT EXPERIMENT
import { useAuth } from "../provider/AuthProvider";
// Cart State
import { useCart } from "../provider/CartProvider";

export default function CheckoutCart() {
  const { clearCart, handleCheckout, itemCount, total } = useCart();

  return (
    <>
      {/* Display Input For Address At Checkout */}
      {/* ADD INPUT FIELDS HERE */}
      <div>
        {/* Button to submit order & info about total price*/}
        <h6>Artiklar:</h6>
        <p>{itemCount}</p>
        <h6>Summa:</h6>
        <p>{total}</p>
      </div>
      <Stack direction="horizontal" gap={2}>
        <Button variant="outline-primary" className="" onClick={handleCheckout}>
          Beställ
        </Button>

        {/* Button to clear cart */}
        <Button variant="outline-danger" onClick={clearCart}>
          Rensa
        </Button>
      </Stack>
    </>
  );
}
