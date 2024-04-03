import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
//components
import UserDetails from "@user/UserDetails";
// Auth Provider
import { useAuth } from "@provider/AuthProvider";

export default function UserInterface() {
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // import from AuthProvider
  const { isAuthenticated, checkAuthentication, fetchUserInfo, handleLogout } =
    useAuth();

  // collect user data from backend, if jwt is correct
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetchUserInfo(token);
      setUserInfo(result);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  // validate JWT of user, if missing send to /login, if valid, fetch user data.
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        fetchUserData();
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Container className="p-4">
        <Col>
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={() => handleLogout()}>
              Logga Ut
            </Button>
          </div>
        </Col>
        <Col>
          {userInfo ? (
            <Row>
              <h2 className="text-center">Välkommen, {userInfo.name}</h2>
              <UserDetails user={userInfo} />
            </Row>
          ) : (
            <p>Loading user information!</p>
          )}
          {error && <p className="text-danger">Error: {error}</p>}
        </Col>
      </Container>
    </>
  );
}
