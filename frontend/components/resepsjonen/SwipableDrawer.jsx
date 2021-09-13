import { Box, Button, CircularProgress, Container, Drawer, Stack, styled, Typography } from "@material-ui/core";

import { GET_BEBOER_KRYSS } from "../../src/query/beboer";

import Link from "next/link";
import { useQuery } from "@apollo/client";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.darker,
}));

function SwipeableEdgeDrawer(props) {
  const { beboerId } = props;
  const { data, loading, error } = useQuery(GET_BEBOER_KRYSS, {
    variables: {
      id: beboerId,
    },
    skip: beboerId == undefined,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      <Drawer
        PaperProps={{ sx: { borderTop: "none", boxShadow: 16 } }}
        variant="persistent"
        anchor="bottom"
        open={beboerId}
      >
        <StyledBox
          sx={{
            py: 3,
            height: "110px",
            overflow: "auto",
          }}
        >
          <Container>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <div>
                {loading || data == undefined ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <>
                    <Typography variant="h5" gutterBottom>
                      {data.hentBeboerKryss.fornavn + " " + data.hentBeboerKryss.etternavn}
                    </Typography>
                    <Typography color="secondary.main" variant="subtitle2">
                      Her kommer en liste over ting som er krysset.
                    </Typography>
                  </>
                )}
              </div>
              <Link href={"/resepsjonen/kryss/" + beboerId} passHref>
                <Button size="large" variant="contained" color="secondary">
                  Velg drikke
                </Button>
              </Link>
            </Stack>
          </Container>
        </StyledBox>
      </Drawer>
    </>
  );
}

export default SwipeableEdgeDrawer;
