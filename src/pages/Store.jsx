import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
export default function Store() {
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h1 className="text-center">Store</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">Under Construction</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
