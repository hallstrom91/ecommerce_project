import React, { useState, useTransition } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function RegisterContainer({ toggleLogin }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          email,
          address,
          city,
          postalCode,
        }),
      });

      // if registration fails
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg = errorMsgJSON.message || "Failed to register user.";
        console.error("failed to register.", errorMsg);
        throw new Error(errorMsg);
      }

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
      //continue all values
      console.log("User Registration Successfull.");
    } catch (error) {
      setError(error.message);
      console.error("Failed to register user", error);
      setTimeout(() => setError(""), 15000);
    }
  };

  return (
    <>
      {/* User Register Input Field */}
      <Container>
        <Form onSubmit={handleRegistration}>
          <Row>
            <Col>
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
          <Row>
            <Col>
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
            <Col>
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
            <Col>
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
            </Col>
          </Row>

          {/* Registration Form Submit Button */}
          <div className="d-flex pt-2">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <div id="errorRegistrationMsg" className="pt-2">
          {successMsg && <p className="text-success">{successMsg}</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>

        {/* Switch to Login Form - Button */}
        <div className="d-flex pt-2 justify-content-end">
          <Button variant="success" onClick={toggleLogin}>
            Login
          </Button>
        </div>
      </Container>
    </>
  );
}
