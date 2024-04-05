import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import Search from "@shared/Search";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar data-bs-theme="dark">
        <NavbarBrand className="mx-auto">
          <p> FashionHub &copy; {year} </p>
        </NavbarBrand>
        <Nav className="px-2">
          <Search className="" />
        </Nav>
      </Navbar>
    </>
  );
}
