import React from "react";

const CustomCard = (props) => {
  return (
    <>
      <h2>{props.header}</h2>

      <div style={{ backgroundColor: "#212026" }}>{props.children}</div>
      {props.footer && <div>{props.footer}</div>}
    </>
  );
};

export default CustomCard;
