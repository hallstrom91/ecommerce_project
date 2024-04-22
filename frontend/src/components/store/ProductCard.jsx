import {
  Card,
  Button,
  Badge,
  Container,
  Col,
  Row,
  ListGroup,
} from "react-bootstrap";

// Cart Provider
import { useCart } from "@provider/CartProvider";

//icons
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";

export default function ProductCard({ product }) {
  // Cart State
  const { addToCart, increase, cartItems, sumItems, itemCount } = useCart();

  // Check if product is added or not already
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <>
      <Container className="p-2">
        <Card>
          <Card.Img src={product.image_url} alt={product.name} />
          <Card.ImgOverlay className="d-flex flex-column justify-content-start align-items-start">
            <div className="d-flex justify-content-between">
              <div>
                <Badge bg="warning" className="align-self-start m-1 text-black">
                  Nyhet
                </Badge>
              </div>
            </div>
          </Card.ImgOverlay>
          {/* Card Body with price, description and buy-button */}
          <Card.Header className="text-white text-center list-group-header fs-4">
            <strong>{product.name}</strong>
          </Card.Header>
          <Card.Body className="d-flex flex-colum text-white card-description-display">
            {/* description */}
            <div className="align-self-start mt-2 fs-5">
              <Card.Text>{product.description}</Card.Text>
            </div>
          </Card.Body>
          <Card.Footer className="d-flex flex-column list-group-header">
            {/* price */}
            <div className="align-self-start">
              <Badge bg="white" text="dark" className="fs-6">
                {product.price} kr
              </Badge>
            </div>
            {/* buy-button / add to cart */}
          </Card.Footer>
        </Card>
        {/* Buy Button, outside of card cuz bug */}
        <ListGroup className="mb-2">
          {/*  If product is already in cart, add check-symbol-cart */}
          {isInCart(product) && (
            <Button
              className="fs-5"
              variant="outline-dark"
              size="md"
              onClick={() => {
                increase(product);
              }}
            >
              Köp
              <strong>
                <BsCartCheck color="green" size={25} />
              </strong>
            </Button>
          )}
          {!isInCart(product) && (
            /* if product is not in cart, show plus-symbol-cart */
            <Button
              className="fs-5"
              variant="outline-dark"
              size="md"
              onClick={() => addToCart(product)}
            >
              Köp
              <strong className="text-white">
                <BsCartPlus color="black" size={25} />
              </strong>
            </Button>
          )}
        </ListGroup>
      </Container>
    </>
  );
}
