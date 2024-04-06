import {
  Container,
  Col,
  Row,
  Carousel,
  CarouselCaption,
} from "react-bootstrap";
import FashionHubCrew1 from "@public/FashionHubCrew.png";
import FashionHubCrew2 from "@public/FashionHubCrew2.png";
export default function CarouselSlide() {
  return (
    <>
      <Container className="p-4">
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img src={FashionHubCrew1} alt="TeamWork" className="img-fluid" />

            <Carousel.Caption>
              <h3>FashionHub Crew</h3>
              <p>
                Vi är stolta över att erbjuda ett brett utbud av moderna kläder
                och accessoarer för människor som värdesätter både stil och
                ansvar. Vi strävar efter att vara en miljömedveten och hållbar
                aktör inom modebranschen.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src={FashionHubCrew2}
              alt="moreTeamWork"
              className="img-fluid"
            />

            <Carousel.Caption>
              <h3>FashionHub Crew</h3>
              <p>
                Genom att prioritera fairtrade-produkter och hållbara material
                gör vi det möjligt för våra kunder att handla med gott samvete.
                Vi är dedikerade till att minska vår miljöpåverkan och främja en
                rättvis och etisk arbetsmiljö för alla involverade i vår
                leverantörskedja.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              src={FashionHubCrew2}
              alt="moreTeamWork"
              className="img-fluid"
            />

            <Carousel.Caption>
              <p>FashionHub Crew</p>
              <h3>
                Vår företagskultur präglas av innovation, kreativitet och
                mångfald. Vi tror på att skapa en inkluderande arbetsplats där
                varje individ uppmuntras att utvecklas och bidra till vår
                gemensamma framgång.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}
