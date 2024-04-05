import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  NavbarCollapse,
  Tab,
  Tabs,
  TabContainer,
} from "react-bootstrap";

// import search component
import Search from "@shared/Search";

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
        data-bs-theme="light"
        sticky="top"
        expanded={open}
        className="navcontainer-bg "
      >
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/" className="text-white">
              FashionHub
            </Nav.Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsiv-nav" onClick={handleToggle} />

          <Navbar.Collapse id="responsiv-nav" onSelect={handleToggle}>
            <Tab.Container>
              {/* Nav as tabs  */}
              <Nav
                fill
                variant="tabs"
                className="me-auto nav-tabs-border"
                defaultActiveKey="1"
              >
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/"
                    eventKey="1"
                    onClick={handleClick}
                    className="text-white"
                  >
                    Hem
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    eventKey="2"
                    to="/store"
                    onClick={handleClick}
                    className="text-white"
                  >
                    Butik
                  </Nav.Link>
                </Nav.Item>

                {/* Display Userpage or Login button */}
                {isAuthenticated ? (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      eventKey="3"
                      to="/private-route"
                      onClick={handleClick}
                      className="text-white"
                    >
                      Min sida
                    </Nav.Link>
                  </Nav.Item>
                ) : (
                  <Nav.Item className="navtab-bg">
                    <Nav.Link
                      as={Link}
                      to="/login"
                      eventKey="4"
                      onClick={handleClick}
                      className="text-white"
                    >
                      Logga in
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Tab.Container>

            <Nav>
              {/* Display ShoppingCart/Checkout */}
              <Nav.Item>
                <Nav.Link as={Link} to="/cart" className="text-white">
                  <div className="d-flex">
                    <IoCartOutline size={30} />
                    <span className="pt-2 p-1 text-white">{itemCount}</span>
                    <p className="pt-2">Varukorg</p>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
