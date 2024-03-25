import { Card, Button, Badge, Container, Col, Row } from "react-bootstrap";

export default function ProductCard({
  image,
  title,
  badge,
  buyBtn,
  price,
  description,
}) {
  return (
    <>
      <Card bg="secondary">
        <Card.Img src={image} />
        <Card.ImgOverlay className="d-flex flex-column justify-content-start align-items-start">
          <div className="d-flex justify-content-between">
            {/*             <div>
              <Card.Title className="text-white">{title}</Card.Title>
            </div> */}
            <div>
              <Badge bg="warning" className="align-self-start m-1 text-black">
                {badge}
              </Badge>
            </div>
          </div>
        </Card.ImgOverlay>
        {/* Card Body with price, description and buy-button */}
        <Card.Header className="text-white text-center">
          {title}
          {/*  <Card.Title className="text-white text-center">{title}</Card.Title> */}
        </Card.Header>
        <Card.Body className="d-flex flex-colum">
          {/* description */}
          <div className="align-self-start mt-2">
            <Card.Text>{description}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          {/* price */}
          <div className="align-self-start">
            <Badge bg="white" text="dark">
              {price} kr
            </Badge>
          </div>
          {/* buy-button */}
          <div className="align-self-end">
            <Button variant="success" size="sm">
              {buyBtn}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
