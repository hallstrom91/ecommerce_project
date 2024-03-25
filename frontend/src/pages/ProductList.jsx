import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/store/products");
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch all products", error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <Container className="p-4">
      <Row className="pb-4">
        <Col>
          <h1 className="text-center">Alla Produkter</h1>
        </Col>
      </Row>
      <Row md={3} sm={2} xs={1}>
        {products.map((product) => (
          <Col key={product.id} className="p-3">
            <ProductCard
              image={product.image_url}
              title={product.name}
              badge={badgeNew}
              buyBtn={"Köp"}
              price={product.price}
              description={product.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
