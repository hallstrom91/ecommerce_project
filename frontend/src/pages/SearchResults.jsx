import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container, Card, Button, Badge } from "react-bootstrap";
import ProductCard from "@store/ProductCard";
import CategoryChoice from "@store/CategoryChoice";
// Cart State
import { useCart } from "@provider/CartProvider";

export default function SearchResults() {
  // import from CartProvider
  const { searchForProducts, results } = useCart();
  // use params
  const { nameOrCategory } = useParams();

  // find products at search
  useEffect(() => {
    if (nameOrCategory) {
      searchForProducts(nameOrCategory);
    }
  }, [nameOrCategory]);

  return (
    <Container className="p-4">
      <Row className="pb-4">
        <Col>
          <h1 className="text-center">
            Sökresultat för: <strong>{nameOrCategory}</strong>
          </h1>
        </Col>
      </Row>
      {/*      Display List Of Categories Choice Menu */}
      <Row>
        <Col className="mb-4 d-flex justify-content-center">
          <CategoryChoice />
        </Col>
      </Row>
      {/* Map of search results to display*/}
      <Row md={3} sm={2} xs={1}>
        {results && results.length > 0 ? (
          results.map((product) => (
            <Col key={product.id} className="p-3">
              <ProductCard product={product} key={product.id} />
            </Col>
          ))
        ) : (
          <Row className="w-100">
            <Col className="d-flex justify-content-center align-items-center">
              <div>
                <p className="text-center fs-5">
                  Inga produkter hittades för sökningen{" "}
                  <strong>{nameOrCategory}</strong>
                </p>
              </div>
            </Col>
          </Row>
        )}
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
    </Container>
  );
}
