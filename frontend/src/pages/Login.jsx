import React, { useState } from "react";
import LoginContainer from "../components/LoginContainer";
import RegisterContainer from "../components/RegisterContainer";
import UserPage from "./UserPage";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function Login() {
  localStorage.getItem("token");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsRegister((prevMode) => !prevMode);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Container className="p-4">
        {/* Header Text Row/Col */}
        <Row className="text-center">
          <Col>
            <h1>{isLoggedIn ? "User Page" : "Login"}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoggedIn ? (
              <UserPage toggleLogout={handleLogout} />
            ) : isRegister ? (
              <RegisterContainer toggleLogin={handleToggle} />
            ) : (
              <LoginContainer
                toggleRegister={handleToggle}
                loginSuccess={handleLoginSuccess}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
