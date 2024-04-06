import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FloatingLabel,
  Form,
  Stack,
  Button,
  Col,
  Row,
  Container,
  Card,
} from "react-bootstrap";

/* JWT AUTH */
import { useAuth } from "@provider/AuthProvider";

export default function Register() {
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
        {/* Switch to Login Form - Button */}
        <div className="d-flex mb-4 justify-content-end">
          <Button variant="outline-dark" as={Link} to="/login">
            Logga In
          </Button>
        </div>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            {/* Register Card */}
            <Card className="text-black">
              <Card.Header className="border-0  text-center list-group-header">
                <strong className="text-center text-white">
                  Skapa ett Konto
                </strong>
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* User Legal/Full Name Input Field */}
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerFullName"
                      type="text"
                      placeholder="Legal_Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="registerFullName">Fullständigt Namn</label>
                  </Form.Floating>

                  {/* User Username Input Field */}
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerUsername"
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="registerUsername">Användarnamn</label>
                  </Form.Floating>

                  {/* User Password Input Field */}
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerPassword"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="registerPassword">Lösenord</label>
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
                </Form>
                <Stack direction="horizontal" gap={3}>
                  {/* User Adress Input Field */}

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerAddress"
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="registerAddress">Gatunamn</label>
                  </Form.Floating>

                  {/* User City Input Field */}

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerCity"
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="registerCity">Stad</label>
                  </Form.Floating>

                  {/* User Postal Code Input Field */}

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="registerPostalCode"
                      type="text"
                      placeholder="Postal_Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <label htmlFor="registerPostalCode">Postkod</label>
                  </Form.Floating>
                </Stack>
                <div className="px-2">
                  <Button
                    className="border-2 border-black"
                    variant="success"
                    type="submit"
                    onClick={() => handleRegisterClick()}
                  >
                    Skicka
                  </Button>
                </div>
              </Card.Body>
              {/* Registration Form Submit Button */}
              {/* Dynamic Error & Success Messages Display */}
              <Card.Footer className="border-0 list-group-header">
                {successMsg && <p className="text-success">{successMsg}</p>}
                {error && <p className="text-danger">{error}</p>}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
