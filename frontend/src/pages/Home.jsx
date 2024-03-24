import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h1 className="text-center">Home</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">Welcome To FashionHub</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
