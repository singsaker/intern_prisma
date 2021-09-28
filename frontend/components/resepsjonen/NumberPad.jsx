import { Button, IconButton, Typography, Box, Card, Stack, Paper } from "@material-ui/core";
import { useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CircleIcon from "@material-ui/icons/Circle";

const NumberPad = (props) => {
  const [pin, setPin] = useState("");

  const addNumber = (number) => (number != undefined ? setPin(pin + number) : setPin(number));
  const removeNumber = () => pin != undefined && setPin(pin.slice(0, -1));

  const numbers = "123456789".split("");
  const rows = numbers
    .map((n) => (
      <Button
        key={n}
        onClick={() => addNumber(n)}
        sx={{
          width: (theme) => theme.spacing(13),
          height: (theme) => theme.spacing(10),
          borderRadius: "0",
        }}
      >
        <Typography variant="h4" sx={{ color: "grey.200" }}>
          {n}
        </Typography>
      </Button>
    ))
    .reduce((r, element, index) => {
      index % 3 === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, [])
    .map((rowContent, i) => (
      <>
        <Stack key={i} direction="row">
          {rowContent}
        </Stack>
      </>
    ));

  return (
    <Card sx={{ width: "fit-content", p: 2 }}>
      <Paper sx={{ bgcolor: "grey.900", p: 3, mb: 2, height: 56, minWidth: 350 }}>
        <Box display="flex" justifyContent="center">
          <Stack direction="row" spacing={1}>
            {pin.split("").map((n, i) => (
              <CircleIcon sx={{ fontSize: 10 }} key={i} color="disabled" />
            ))}
          </Stack>
        </Box>
      </Paper>

      <Box display="flex" flexDirection="column" alignItems="center" mx={-2}>
        <div>{rows}</div>

        <Stack direction="row">
          <IconButton
            onClick={() => setPin("")}
            sx={{
              mx: 2,
              mt: 2,
              width: (theme) => theme.spacing(6),
              height: (theme) => theme.spacing(6),
              color: "white",
            }}
          >
            <ClearOutlinedIcon />
          </IconButton>
          <Button
            onClick={() => addNumber(0)}
            sx={{
              width: (theme) => theme.spacing(13),
              height: (theme) => theme.spacing(10),
              borderRadius: "0",
            }}
          >
            <Typography variant="h4" sx={{ color: "grey.200" }}>
              0
            </Typography>
          </Button>
          <IconButton
            onClick={() => removeNumber()}
            sx={{
              mx: 2,
              mt: 2,
              width: (theme) => theme.spacing(6),
              height: (theme) => theme.spacing(6),
              color: "white",
            }}
          >
            <KeyboardBackspaceOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>

      <Button onClick={() => props.code(pin)} size="large" color="inherit" fullWidth sx={{ mt: 3 }} variant="outlined">
        Submit
      </Button>
    </Card>
  );
};

export default NumberPad;
