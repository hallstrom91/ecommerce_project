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
              {/* Dropdown Button For Store / Categories  ?? make fetch & map over categories for dynamic display??*/}
              <NavDropdown title="Store" id="responsiv-dropdwnbtn">
                <NavDropdown.Item>
                  {/* View all Categories / General Store */}
                  <Link
                    to="/store"
                    className="text-black p-2 text-decoration-none"
                    onClick={handleClick}
                  >
                    Butik
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* View all products in Jackets */}
                <NavDropdown.Item>
                  <Link to="" className="text-black p-2 text-decoration-none">
                    Jackor
                  </Link>
                </NavDropdown.Item>
                {/* View all products in Hoodies */}
                <NavDropdown.Item>
                  <Link to="" className="text-black p-2 text-decoration-none">
                    Tröjor
                  </Link>
                </NavDropdown.Item>
                {/* View all products in Tshirts */}
                <NavDropdown.Item>
                  <Link to="" className="text-black p-2 text-decoration-none">
                    Tshirts
                  </Link>
                </NavDropdown.Item>
                {/* View all products in headwear  */}
                <NavDropdown.Item>
                  <Link to="" className="text-black p-2 text-decoration-none">
                    Kepsar
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                to="/about"
                className="text-black p-2 text-decoration-none"
                onClick={handleClick}
              >
                Om FashionHub
              </Link>
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
