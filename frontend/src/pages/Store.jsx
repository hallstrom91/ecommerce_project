import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";

export default function Store() {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all categories at mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products related to specific category
  useEffect(() => {
    if (selectedCategory) {
      fetchProductByCategory(selectedCategory.id);
    } else {
      fetchAllProducts();
    }
  }, [selectedCategory]);

  // fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/store/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories.", error);
    }
  };

  // fetch products by category
  const fetchProductByCategory = async (categoryId) => {
    try {
      if (categoryId) {
        const response = await fetch(
          `http://localhost:3000/store/categories/${categoryId}`
        );
        const data = await response.json();
        setProductByCategory(data);
      } else {
        const response = await fetch("http://localhost:3000/store/products");
        const data = await response.json();
        setProductByCategory(data);
      }
    } catch (error) {
      console.error("Failed to fetch products related to category", error);
    }
  };

  // fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/store/products");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products.", error);
    }
  };

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
        {/* Map Categories to Display */}
        <Row>
          <Col>
            <h3>Kategorier</h3>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to="#" onClick={() => setSelectedCategory(category)}>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="#" onClick={() => fetchAllProducts()}>
                Alla Produkter
              </Link>
            </li>
          </Col>
          <Col>
            <h3>Produkter</h3>
            <ul>
              {productByCategory.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
            <ul>
              {allProducts.map((products) => {
                <li key={products.id}>{products.name}</li>;
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}
