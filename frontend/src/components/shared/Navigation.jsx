import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  NavbarCollapse,
} from "react-bootstrap";

// customer Cart icon
import { IoCartOutline } from "react-icons/io5";
// JWT Auth
import { useAuth } from "@provider/AuthProvider";
// Cart State
import { useCart } from "@provider/CartProvider";

export default function Navigation() {
  // Navbar open / closed in state
  const [open, setOpen] = useState(false);

  // Auth-state + Auth function from AuthProvider
  const { isAuthenticated, checkAuthentication } = useAuth();

  // display itemCount in Navbar next to cart icon
  const { itemCount } = useCart();

  // Navbar handleToggle
  const handleToggle = () => {
    setOpen(!open);
  };

  // Navbar handleClick
  const handleClick = () => {
    setOpen(false);
  };

  // validate jwt, and change Link according to authenticated or not
  const handleUser = () => {
    const isAuthenticated = checkAuthentication();
    if (isAuthenticated) {
      console.log("Display - 'Min Sida' - in navbar");
    } else {
      console.log("Display - 'Logga in' - in navbar");
    }
  };

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
            </Nav>
            <Nav className="">
              {/* Display Userpage or Login button */}
              {isAuthenticated ? (
                <Link
                  to="/private-route"
                  onClick={handleClick}
                  className="text-black p-2 text-decoration-none"
                >
                  Min sida
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={handleClick}
                  className="text-black p-2 text-decoration-none"
                >
                  Logga in
                </Link>
              )}
              {/* Display ShoppingCart/Checkout */}
              <Link to="/cart" className="text-black  text-decoration-none">
                <div className="d-flex">
                  <IoCartOutline size={30} />
                  <span className="pt-2 p-1 text-white">{itemCount}</span>
                  <p className="pt-2 text-black">Varukorg</p>
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
