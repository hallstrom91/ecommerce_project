import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function LoginContainer({ toggleRegister, loginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    /*  event.preventDefault(); */
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        /* credentials: "include", */
      });

      // collect response
      const result = await response.json();

      // if login fails
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg = errorMsgJSON || "Failed to login.";
        console.error("Failed to login.", errorMsg);
        throw new Error(errorMsg);
      }

      // clear all input-fields at success
      setUsername("");
      setPassword("");
      console.log("Login Successfull.");
      const token = result.token;
      localStorage.setItem("token", token);
      loginSuccess();
    } catch (error) {
      setError(error.message);
      console.error("Failed to login.", error);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <Container>
        {/*   <Form onSubmit={handleLogin}> */}
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
          <Button variant="secondary" onClick={() => handleLogin()}>
            Submit
          </Button>
        </div>
        {/*  </Form> */}

        {/* Show Error Message if failed login */}

        <div id="errorLoginMsg" className="pt-2">
          {error && <p className="text-danger">{error}</p>}
        </div>

        {/* Switch to Registration Form - Button */}

        <div className="d-flex pt-2 justify-content-end">
          <Button variant="success" onClick={toggleRegister}>
            Register
          </Button>
        </div>
      </Container>
    </>
  );
}
