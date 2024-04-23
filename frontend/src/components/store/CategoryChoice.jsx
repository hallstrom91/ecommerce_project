import React, { useState, useEffect } from "react";
import { Nav, Card, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Products from "@pages/Products";
import SubCategory from "@pages/SubCategory";

export default function CategoryChoice() {
  const [categories, setCategories] = useState([]);

  // get categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/store/categories");
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        // add logger
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Row>
        <Col className="mb-4 d-flex justify-content-center">
          <Card className="p-2">
            <Nav>
              <Nav.Item>
                <Nav.Link as={Link} to="/store/all" className="text-black fs-5">
                  Visa allt
                </Nav.Link>
              </Nav.Item>
              {categories.map((cateogory) => (
                <Nav.Item key={cateogory.id}>
                  <Nav.Link
                    as={Link}
                    to={`/store/${cateogory.id}`}
                    className="px-3 text-black fs-5"
                  >
                    {cateogory.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card>
        </Col>
      </Row>
    </>
  );
}
