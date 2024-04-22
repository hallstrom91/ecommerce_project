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

// Auth Provider
import { useAuth } from "@provider/AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // call function for login
  const { handleLogin } = useAuth();
  // use navigate to redirect after successfull login
  const navigate = useNavigate();

  // call function to verify user credentials
  const handleLoginClick = async () => {
    try {
      const token = await handleLogin(username, password);
      localStorage.setItem("token", token);
      // clear all input-fields at success
      setUsername("");
      setPassword("");
      navigate("/private-route");
    } catch (error) {
      // show dynamic error message
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <Container className="p-4">
        <Row className="d-flex justify-content-center">
          <Col sm={4}>
            {/* Login Card */}
            <Card className="">
              <Card.Header className="border-0  text-center list-group-header text-white">
                <strong className="text-center ">Logga In</strong>
              </Card.Header>
              <Card.Body>
                {/* Username Login Input Field */}
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="loginUsername"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="loginUsername">Användarnamn</label>
                </Form.Floating>

                {/* User Password Input Field */}

                <Form.Floating className="pb-2">
                  <Form.Control
                    id="loginPassword"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="loginPassword">Lösenord</label>
                </Form.Floating>
                {/* Login Submit Button */}

                <div className="d-flex">
                  <Button variant="success" onClick={() => handleLoginClick()}>
                    Logga In
                  </Button>
                </div>
                <Card.Text className="text-end fs-5 ">Skapa konto</Card.Text>
                {/* Switch to Registration Form - Button */}
                <div className="d-flex justify-content-end">
                  <Button variant="outline-dark" as={Link} to="/register">
                    Registrera
                  </Button>
                </div>
              </Card.Body>
              {/* Show Error Message if failed login */}
              <Card.Footer className="border-0 list-group-header py-5">
                {error && <p className="text-danger">{error}</p>}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
