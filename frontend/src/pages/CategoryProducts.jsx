import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

// Cart State
import { useCart } from "../provider/CartProvider";

export default function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  // collects item related to category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/store/categories/${categoryId}`
        );
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("failed to fetch products", error);
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
        <Row md={3} sm={2} xs={1}>
          {products.map((product) => (
            <Col key={product.id} className="p-3">
              <ProductCard key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
