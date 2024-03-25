import { Card, Button, Badge } from "react-bootstrap";

export default function CategoryCard({ image, title, badge, button }) {
  return (
    <>
      <Card>
        <Card.Img src={image} />
        <Card.ImgOverlay className="d-flex flex-column justify-content-start align-items-start">
          <div className="d-flex justify-content-between w-100">
            <Card.Title className="text-white mr-auto">{title}</Card.Title>
            <Badge bg="warning" className="m-1 text-black">
              {badge}
            </Badge>
          </div>
          <div className="align-self-end mt-auto">
            <Button variant="primary" size="sm">
              {button}
            </Button>
          </div>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}
