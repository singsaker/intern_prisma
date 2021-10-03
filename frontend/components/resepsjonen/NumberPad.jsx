import { Button, IconButton, Typography, Box, Card, Stack, Paper } from "@mui/material";
import { useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(2, 2, 0, 2),
  width: theme.spacing(6),
  height: theme.spacing(6),
  color: "white",
}));

const NumberButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        width: (theme) => theme.spacing(13),
        height: (theme) => theme.spacing(10),
        borderRadius: 0,
      }}
    >
      <Typography variant="h4" sx={{ color: "grey.200" }}>
        {props.number}
      </Typography>
    </Button>
  );
};

const NumberPad = (props) => {
  const [pin, setPin] = useState("");

  const addNumber = (number) => setPin(pin + number);
  const removeNumber = () => pin != undefined && setPin(pin.slice(0, -1));

  const numbers = "123456789".split("");
  const rows = numbers
    .map((n) => <NumberButton key={n} number={n} onClick={() => addNumber(n)} />)
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
      <Paper sx={{ bgcolor: "grey.900", p: 2, mb: 2, height: 56, minWidth: 350 }}>
        <Box display="flex" justifyContent="center">
          <Stack direction="row" spacing={1}>
            <AnimatePresence>
              {pin.split("").map((n, i) => (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    default: { duration: 0.1 },
                  }}
                  key={i}
                >
                  <CircleIcon sx={{ fontSize: 10 }} color="disabled" />
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        </Box>
      </Paper>

      <Box display="flex" flexDirection="column" alignItems="center" mx={-2} mb={3}>
        <div>{rows}</div>

        <Stack direction="row">
          <StyledIconButton onClick={() => setPin("")}>
            <ClearOutlinedIcon />
          </StyledIconButton>
          <NumberButton number={0} onClick={() => addNumber(0)} />
          <StyledIconButton onClick={() => removeNumber()}>
            <KeyboardBackspaceOutlinedIcon />
          </StyledIconButton>
        </Stack>
      </Box>

      <Button onClick={() => props.code(pin)} size="large" color="inherit" fullWidth variant="outlined">
        Submit
      </Button>
    </Card>
  );
};

export default NumberPad;
