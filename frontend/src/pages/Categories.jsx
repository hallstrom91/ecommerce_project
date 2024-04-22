import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container, Button, Dropdown } from "react-bootstrap";
import CategoryCard from "@store/CategoryCard";
import CategoryChoice from "@store/CategoryChoice";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  // Values for badges in category display
  const badgePopular = "Populärt";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/store/categories");
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Container className="p-4">
        <Row className="pb-4">
          <Col>
            <h1 className="text-center">Kategorier</h1>
          </Col>
        </Row>
        {/*      Display List Of Categories Choice Menu */}
        <Row>
          <Col className="mb-4 d-flex justify-content-center">
            <CategoryChoice />
          </Col>
        </Row>
        {/* Map Categories to Display */}
        <Row md={3} sm={2} xs={1}>
          {categories.map((category) => (
            <Col key={category.id} className="my-1">
              <Link to={`/store/${category.id}`}>
                <CategoryCard
                  image={category.image_url}
                  title={category.name}
                  button={"Titta"}
                  badge={badgePopular}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
