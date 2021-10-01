import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Spinner = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
