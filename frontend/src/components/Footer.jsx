import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

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
