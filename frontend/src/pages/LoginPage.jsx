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

/* JWT AUTH - authprovider.jsx*/
import { useAuth } from "../provider/AuthProvider";

export default function LoginPage() {
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
        <Row>
          <Col>
            {/* Username Login Input Field */}
            <Form.Floating className="mb-3">
              <Form.Control
                id="loginUsername"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="loginUsername">Username</label>
            </Form.Floating>

            {/* User Password Input Field */}

            <Form.Floating className="mb-3">
              <Form.Control
                id="loginPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="loginPassword">Password</label>
            </Form.Floating>
          </Col>
        </Row>

        {/* Login Submit Button */}

        <div className="d-flex">
          <Button variant="secondary" onClick={() => handleLoginClick()}>
            Submit
          </Button>
        </div>

        {/* Show Error Message if failed login */}

        <div id="errorLoginMsg" className="pt-2">
          {error && <p className="text-danger">{error}</p>}
        </div>

        {/* Switch to Registration Form - Button */}

        <div className="d-flex pt-2 justify-content-end">
          <Button variant="success" as={Link} to="/register">
            Register
          </Button>
        </div>
      </Container>
    </>
  );
}
