import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import ProductCard from "@store/ProductCard";
import { FaArrowLeft } from "react-icons/fa6";
import CategoryChoice from "@store/CategoryChoice";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function SubCategory() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  // collects item related to category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/store/categories/${categoryId}`);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        // add logger
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <>
      <Container className="p-4">
        <Row className="pb-4">
          <Col>
            <h1 className="text-center">Produkter</h1>
          </Col>
        </Row>
        {/*      Display List Of Categories Choice Menu */}
        <Row>
          <Col className="mb-4 d-flex justify-content-center">
            <CategoryChoice />
          </Col>
        </Row>
        {/* Display products related to a specific category */}
        <Row md={3} sm={2} xs={1}>
          {products.map((product) => (
            <Col key={product.id} className="p-3">
              <ProductCard key={product.id} product={product} />
            </Col>
          ))}
        </Row>
        {/* Go Back Button */}
        <Row>
          <Col className="mb-4">
            <Link to="/store">
              <Button variant="outline-primary" className="my-1">
                <FaArrowLeft /> Tillbaka
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
