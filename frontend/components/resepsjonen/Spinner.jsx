import { CircularProgress } from "@material-ui/core";
import { Box } from "@material-ui/system";

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
