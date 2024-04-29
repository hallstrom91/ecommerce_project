import { Navbar, Nav, NavbarBrand, Container } from "react-bootstrap";
import Search from "@shared/Search";
import { FaGithub } from "react-icons/fa";
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
              <p>FashionHub &copy; {year}</p>
              <a
                href="https://kjsportfolio.se"
                className="text-white text-decoration-none fs-6"
              >
                <p className="fs-6">Made by kjsportfolio.se</p>
              </a>
              <a
                href="https://github.com/hallstrom91/ecommerce_project"
                className="text-white text-decoration-none fs-6"
              >
                <span className="px-2">
                  <FaGithub size={25} />
                </span>
                Github
              </a>
            </NavbarBrand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
