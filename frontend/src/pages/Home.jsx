import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container className="p-4">
        <Row>
          <Col>
            <h1 className="text-center">Välkommen till FashionHub</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">
              FashionHub är inte bara en butik, det är en destination där stil
              möter medvetenhet och kvalitet. Vi är stolta över att erbjuda ett
              brett utbud av moderna kläder och accessoarer för människor som
              värdesätter både stil och ansvar. Vi strävar efter att vara en
              miljömedveten och hållbar aktör inom modebranschen. Genom att
              prioritera fairtrade-produkter och hållbara material gör vi det
              möjligt för våra kunder att handla med gott samvete. Vi är
              dedikerade till att minska vår miljöpåverkan och främja en rättvis
              och etisk arbetsmiljö för alla involverade i vår leverantörskedja.
              Vår företagskultur präglas av innovation, kreativitet och
              mångfald. Vi tror på att skapa en inkluderande arbetsplats där
              varje individ uppmuntras att utvecklas och bidra till vår
              gemensamma framgång. Hos oss är alla välkomna, oavsett bakgrund
              eller identitet.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">
              Vi är stolta över att presentera vår nyöppnade webbshop, där du
              kan upptäcka de senaste trenderna och hitta din personliga stil.
              Registrera dig idag för att ta del av exklusiva bonusar och
              erbjudanden framöver! Som registrerad medlem hos oss får du
              tillgång till specialerbjudanden, förtur till nya kollektioner och
              personlig shoppingrådgivning från vårt erfarna team av stylister.
              Gå med oss på FashionHub och låt oss tillsammans skapa en mer
              hållbar och stilfull framtid!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
