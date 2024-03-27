import { Card, Button, Badge, Container, Col, Row } from "react-bootstrap";

// Cart State
import { useCart } from "../provider/CartProvider";

export default function ProductCard({ product }) {
  // Cart State
  const { addToCart, increase, cartItems, sumItems, itemCount } = useCart();

  // Check if product is added or not already
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <>
      <Card bg="secondary">
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
        <Card.Header className="text-white text-center">
          {product.name}
          {/*  <Card.Title className="text-white text-center">{title}</Card.Title> */}
        </Card.Header>
        <Card.Body className="d-flex flex-colum">
          {/* description */}
          <div className="align-self-start mt-2">
            <Card.Text>{product.description}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          {/* price */}
          <div className="align-self-start">
            <Badge bg="white" text="dark">
              {product.price} kr
            </Badge>
          </div>
          {/* buy-button / add to cart */}
        </Card.Footer>
      </Card>
      {/* FIX THIS SHIT */}
      <div className="align-self-end p-2">
        {isInCart(product) && (
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              increase(product);
            }}
          >
            Köp Fler
          </Button>
        )}

        {!isInCart(product) && (
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => addToCart(product)}
          >
            Köp
          </Button>
        )}
      </div>
    </>
  );
}
