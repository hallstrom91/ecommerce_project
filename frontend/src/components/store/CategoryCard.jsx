import { Card, Button, Badge } from "react-bootstrap";

export default function CategoryCard({ image, title, badge, button }) {
  return (
    <>
      <Card>
        <Card.Img src={image} alt={title} />
        <Card.ImgOverlay className="d-flex flex-column justify-content-start align-items-start">
          <div className="w-100">
            <Card.Title className="text-white fs-4">{title}</Card.Title>
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
