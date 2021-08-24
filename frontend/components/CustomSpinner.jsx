import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SpinnerComponent = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "inherit",
      }}
      fluid
    >
      <Row>
        <Col />
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Spinner
            variant="info"
            animation="border"
            style={{ width: "6rem", height: "6rem" }}
          />
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default SpinnerComponent;
