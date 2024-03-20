import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { IoCartOutline } from "react-icons/io5";

export default function Navigation() {
  // Navbar open / closed in state
  const [open, setOpen] = useState(false);

  // Navbar handleToggle
  const handleToggle = () => {
    setOpen(!open);
  };

  // Navbar handleClick
  const handleClick = () => {
    setOpen(false);
  };

  // fetch categories and display in dropdown-btn dynamic

  // store categories in state
  /*   const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/store/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      }
    };
    fetchAllCategories();
  }, []); */

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="secondary"
        data-bs-theme="light"
        sticky="top"
        expanded={open}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-black p-2 text-decoration-none">
              FashionHub
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsiv-nav" onClick={handleToggle} />
          <Navbar.Collapse id="responsiv-nav" onSelect={handleToggle}>
            <Nav className="me-auto">
              <Link
                to="/"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Hem
              </Link>
              <Link
                to="/store"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Butik
              </Link>
              <Link
                to="/about"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                FashionHub FAQ
              </Link>
              {/* Dropdown Button For Store / Categories  ?? make fetch & map over categories for dynamic display??*/}
              {/*            <NavDropdown title="Store" id="responsiv-dropdwnbtn">
                <NavDropdown.Item as={Link} to="/store">
                  Store
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <div>
                  {categories.map((category) => (
                    <NavDropdown.Item key={category.id}>
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </div>
              </NavDropdown> */}
            </Nav>
            <Nav className="">
              <div className="d-flex">
                <IoCartOutline size={30} />
                <p className="pt-2 text-black">Varukorg</p>
              </div>
              <Link
                to="/login"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Ditt Konto
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
