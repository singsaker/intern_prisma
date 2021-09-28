import NumberPad from "@components/resepsjonen/NumberPad";
import { Container } from "@material-ui/core";
import { useState } from "react";

const PinPage = () => {
  const [pin, setPin] = useState();

  console.log(pin);

  return (
    <>
      <Container>
        <NumberPad code={(num) => setPin(num)} />
      </Container>
    </>
  );
};

export default PinPage;
