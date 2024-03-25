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
import CheckoutForm from "../components/CheckoutForm";
import CheckoutCart from "../components/CheckoutCart";
export default function Checkout() {
  return (
    <>
      <Container className="p-4">
        <h1 className="text-center"> Checkout</h1>
        {/* TEST BELOW */}
        <Row>
          <Col>
            <CheckoutForm />
          </Col>
          <Col>
            <CheckoutCart />
          </Col>
        </Row>
      </Container>
    </>
  );
}
