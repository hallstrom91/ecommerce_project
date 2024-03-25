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

// JWT EXPERIMENT
import { useAuth } from "../provider/AuthProvider";

export default function CheckoutForm() {
  const [userInfo, setUserInfo] = useState("");
  const { isAuthenticated, checkAuthentication, fetchUserInfo } = useAuth();
  const navigate = useNavigate();

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

  // validate JWT of user, if missing, dont try fetch data - FIX
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
      <Container>
        {/*         <Row>
          <Col md={4}>
            <h5>Leverans Adress</h5>
          </Col>
        </Row>
        <Row>
          <Col md={4}> */}
        {/* Display Customer Name */}
        <Form.Floating className="mb-3">
          <Form.Control
            id="FullName"
            type="text"
            placeholder="Legal_Name"
            disabled
          />
          <label htmlFor="FullName">{userInfo.name}</label>
        </Form.Floating>

        {/* Display Customer Email */}
        <Form.Floating className="mb-3">
          <Form.Control id="Email" type="email" placeholder="Email" disabled />
          <label htmlFor="Email">{userInfo.email}</label>
        </Form.Floating>

        {/* Display Customer Adress */}
        <Form.Floating className="mb-3">
          <Form.Control
            id="Address"
            type="text"
            placeholder="Address"
            disabled
          />
          <label htmlFor="Address">{userInfo.address}</label>
        </Form.Floating>
        {/*        </Col>
        </Row>
        <Row> */}
        {/* Display Customer City */}
        <Col md={2}>
          <Form.Floating className="mb-3">
            <Form.Control id="City" type="text" placeholder="City" disabled />
            <label htmlFor="City">{userInfo.city}</label>
          </Form.Floating>
        </Col>
        {/* Display Customer Postal Code */}
        {/*           <Col md={2}> */}
        <Form.Floating>
          <Form.Control
            id="PostalCode"
            type="text"
            placeholder="Postal_Code"
            disabled
          />
          <label htmlFor="PostalCode">{userInfo.postal_code}</label>
        </Form.Floating>
        {/*          </Col>
        </Row> */}
        {/* Button to change delivery address at UserPage */}
        {/*         <Row>
          <Col> */}
        <Link to="/private-route">
          <Button variant="outline-primary">Ändra</Button>
        </Link>
        {/*           </Col>
        </Row> */}
      </Container>
    </>
  );
}
