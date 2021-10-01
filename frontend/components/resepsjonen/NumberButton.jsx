import { Button } from "@mui/material";

const NumberButton = (props) => {
  return (
    <Button color="primary" variant="contained" size="large" sx={{ p: 5 }}>
      {props.children}
    </Button>
  );
};

export default NumberButton;
