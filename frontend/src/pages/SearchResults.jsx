import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container, Card, Button, Badge } from "react-bootstrap";
import ProductCard from "@store/ProductCard";
// Cart State
import { useCart } from "@provider/CartProvider";

export default function SearchResults() {
  // import from CartProvider
  const { searchForProducts, results } = useCart();
  const { idOrName } = useParams();

  useEffect(() => {
    if (idOrName) {
      searchForProducts(idOrName);
    }
  }, [idOrName]);

  return (
    <Container className="p-4">
      <Row className="pb-4">
        <Col>
          <h1 className="text-center">Resultat</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <Link to="/store">
            <Button variant="outline-primary" className="my-1">
              Tillbaka
            </Button>
          </Link>
        </Col>
      </Row>
      {/* Map of search results to display*/}
      <Row md={3} sm={2} xs={1}>
        {results ? (
          results.map((product) => (
            <Col key={product.id} className="p-3">
              <ProductCard product={product} key={product.id} />
            </Col>
          ))
        ) : (
          <p className="text-center">Inga produkter hittades...</p>
        )}
      </Row>
    </Container>
  );
}
