import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { IoCartOutline } from "react-icons/io5";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpen(false);
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
          <Link to="/" className="text-black p-2 text-decoration-none">
            <Navbar.Brand>FashionHub</Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="responsiv-navbar"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="responsiv-navbar" onSelect={handleToggle}>
            <Nav className="me-auto">
              <Link
                to="/"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Home
              </Link>
              <Link
                to="/store"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Store
              </Link>
              <Link
                to="/about"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                About
              </Link>
              <Link
                to="/login"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Login
              </Link>
            </Nav>
            <Nav className="">
              <div className="d-flex">
                <IoCartOutline size={30} />
                <p className="pt-1">Shopping Cart</p>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
