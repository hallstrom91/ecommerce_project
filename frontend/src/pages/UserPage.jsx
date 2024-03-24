import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";

// JWT EXPERIMENT
import { useAuth } from "../provider/AuthProvider";

export default function UserPage() {
  const navigate = useNavigate();

  // import from AuthProvider
  const {
    isAuthenticated,
    checkAuthentication,
    fetchUserInfo,
    handleLogout,
    userInfo,
    setUserInfo,
    error,
    setError,
  } = useAuth();

  // collect user data from backend, if jwt is correct
  const fetchUserData = async () => {
    try {
      const userInfo = await fetchUserInfo();
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
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        </Col>
        <Col>
          {userInfo ? (
            <Row>
              <h2>Welcome {userInfo.name}</h2>
              <p>Email: {userInfo.email}</p>
              <p>Address: {userInfo.address} </p>
              <p>City: {userInfo.city} </p>
              <p>Postal Code: {userInfo.postal_code} </p>
              <p>INFO HERE</p>
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
