import { Navbar, Nav, NavbarBrand, Container } from "react-bootstrap";
import Search from "@shared/Search";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar>
        <Container className="d-flex justify-content-center mt-4">
          <Nav className="flex-column flex-sm">
            <Nav.Item className="order-1 order-sm-1 px-4">
              <Search />
            </Nav.Item>
            <NavbarBrand className="order-2 order-sm-2 text-center text-white">
              <p>FashionHub &copy; {year} by kjsportfolio.se</p>
            </NavbarBrand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
