import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from "../provider/authProvider_try1";

export default function UserPage({ toggleLogout }) {
  /*   const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  } */

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  /*   const token = localStorage.getItem("token"); */

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/customer", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user information.");
        }
        const data = await response.json();
        console.log(data.token);
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Container className="p-4">
        <Col>
          <div className="d-flex justify-content-end">
            <Button onClick={toggleLogout}>Logout</Button>
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
