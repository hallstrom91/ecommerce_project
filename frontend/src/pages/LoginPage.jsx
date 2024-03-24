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

/* JWT AUTH */
import { useAuth } from "../provider/AuthProvider";

export default function LoginPage() {
  // import useState getter & setter + functions from AuthProvider
  const {
    isAuthenticated,
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
  } = useAuth();

  // call function to verify user credentials
  const handleLoginClick = async () => {
    try {
      const response = await handleLogin();
    } catch (error) {
      console.error("Error with login", error);
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
