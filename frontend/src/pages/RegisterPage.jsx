import React, { useState, useTransition } from "react";
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

/* JWT AUTH */
import { useAuth } from "../provider/AuthProvider";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  // call function to register user
  const { handleRegistration } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      const response = await handleRegistration(
        name,
        username,
        password,
        email,
        address,
        city,
        postalCode
      );
      // clear all input-fields at success
      setName("");
      setUsername("");
      setPassword("");
      setEmail("");
      setAddress("");
      setCity("");
      setPostalCode("");
      // success message
      setSuccessMsg("Registration Successfull. Please Login.");
      setTimeout(() => setSuccessMsg(""), 5000);
      // send user to /login after successfull registration
      const redirectToLogin = setTimeout(() => {
        navigate("/login");
      }, 5500);
    } catch (error) {
      // show dynamic error message
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      {/* User Register Input Field */}
      <Container className="p-4">
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            {/* User Legal/Full Name Input Field */}
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerFullName"
                type="text"
                placeholder="Legal_Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="registerFullName">Legal Name</label>
            </Form.Floating>

            {/* User Username Input Field */}
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerUsername"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="registerUsername">Username</label>
            </Form.Floating>

            {/* User Password Input Field */}
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="registerPassword">Password</label>
            </Form.Floating>

            {/* User email Input Field */}
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerEmail"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="registerEmail">Email</label>
            </Form.Floating>
          </Col>
        </Row>

        {/* User Adress Input Field */}
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerAddress"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="registerAddress">Street Name</label>
            </Form.Floating>
          </Col>

          {/* User City Input Field */}
          <Col md={3}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerCity"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="registerCity">City</label>
            </Form.Floating>
          </Col>

          {/* User Postal Code Input Field */}
          <Col md={2}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="registerPostalCode"
                type="text"
                placeholder="Postal_Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <label htmlFor="registerPostalCode">Postal Code</label>
            </Form.Floating>
            <div className="">
              <Button
                variant="secondary"
                type="submit"
                onClick={() => handleRegisterClick()}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>

        {/* Registration Form Submit Button */}
        {/* Dynamic Error & Success Messages Display */}
        <Row>
          <Col className="d-flex pt-2 ">
            <div id="errorRegistrationMsg" className="pt-2">
              {successMsg && <p className="text-success">{successMsg}</p>}
              {error && <p className="text-danger">{error}</p>}
            </div>
          </Col>
        </Row>

        {/* Switch to Login Form - Button */}
        <div className="d-flex pt-2 justify-content-end">
          <Button variant="success" as={Link} to="/login">
            Login
          </Button>
        </div>
      </Container>
    </>
  );
}
