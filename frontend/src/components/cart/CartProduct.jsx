import {
  FloatingLabel,
  Form,
  Stack,
  Button,
  Col,
  Row,
  Container,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";

// remove, add & trash icons
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function CartProduct({ product }) {
  const { removeFromCart, increase, decrease } = useCart();

  // Calculate Correct Price for Items
  const totalForProduct = product.price * product.quantity;

  return (
    <>
      <Card className="my-2 text-white">
        <Card.Body className="rounded-2">
          <Row>
            {/* Product Image Display */}
            <Col xs={3}>
              <Image
                src={product.image_url}
                alt={product.name}
                roundedCircle
                fluid
              />
            </Col>

            {/* Product Name & Description */}
            <Col xs={5}>
              <Card.Title className="fs-4">{product.name}</Card.Title>
              <Card.Text className="fs-5">{product.description}</Card.Text>
            </Col>

            {/* Number of Each Product & Price */}
            <Col xs={4}>
              <Card.Text className="fs-5">
                Pris: {Math.round(product.price)}kr{" "}
              </Card.Text>
              <Card.Text className="fs-5">
                Totalt: {totalForProduct}kr
              </Card.Text>
              <Card.Text className="fs-5">
                Antal: {product.quantity}st
              </Card.Text>
            </Col>
          </Row>
          {/* Add, Remove and Trash button - Row Below */}
          <Row>
            <Col xs={12} className="d-flex my-2 justify-content-end">
              {/* Display increase button */}
              <div className="px-2">
                <Button
                  onClick={() => increase(product)}
                  variant="outline-success"
                  size="sm"
                >
                  <CiCirclePlus size={35} />
                </Button>
              </div>

              {/* Display decrease button  */}
              <div className="px-2">
                {product.quantity > 1 && (
                  <Button
                    onClick={() => decrease(product)}
                    variant="outline-danger"
                    size="sm"
                  >
                    <CiCircleMinus size={35} />
                  </Button>
                )}
              </div>

              {/* Display trash button */}
              <div className="">
                {product.quantity === 1 && (
                  <Button
                    onClick={() => removeFromCart(product)}
                    className="outline-dark"
                    size="sm"
                  >
                    <CiTrash size={35} />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
