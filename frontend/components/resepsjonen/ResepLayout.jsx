import { Global } from "@emotion/react";
import { Box } from "@mui/system";

const ResepLayout = (props) => {
  return (
    <>
      <Global styles={{ body: { overflowY: "scroll" } }}></Global>
      <Box sx={{ maxWidth: 1800, mx: "auto", px: 3 }}>{props.children}</Box>
    </>
  );
};

export default ResepLayout;
