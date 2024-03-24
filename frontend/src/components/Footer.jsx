import React from "react";
import { Navbar, Nav, NavbarBrand } from "react-bootstrap";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar bg="secondary" data-bs-theme="light">
        <NavbarBrand className="mx-auto">
          <p>{year} &copy; FashionHub</p>
        </NavbarBrand>
      </Navbar>
    </>
  );
}
