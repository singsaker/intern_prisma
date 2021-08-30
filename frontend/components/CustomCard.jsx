import React from "react";

import Card from "react-bootstrap/Card";

const CustomCard = (props) => {
  return (
    <Card bg="dark" text="white">
      <Card.Header>
        <h2>{props.header}</h2>
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#212026" }}>{props.children}</Card.Body>
      {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
    </Card>
  );
};

export default CustomCard;
