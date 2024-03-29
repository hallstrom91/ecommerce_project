import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import CategoryCard from "../components/CategoryCard";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  // Values for badges in category display
  const badgeNew = "Nytt";
  const badgePopular = "Populärt";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/store/categories");
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
        <Link to="/store/all">
          <Button className="my-1">Alla produkter</Button>
        </Link>
      </Container>
    </>
  );
}
