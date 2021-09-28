import { useQuery } from "@apollo/client";
import NumberPad from "@components/resepsjonen/NumberPad";
import Spinner from "@components/resepsjonen/Spinner";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { GET_BEBOER } from "@src/query/beboer";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { ArrowBack } from "@material-ui/icons";

const PinPage = () => {
  const [pin, setPin] = useState();
  const router = useRouter();
  const { pid } = router.query;

  const {
    data: beboerData,
    loading: beboerLoading,
    error: beboerError,
  } = useQuery(GET_BEBOER, {
    variables: {
      id: parseInt(pid),
    },
  });

  if (beboerLoading) return <Spinner />;
  if (beboerError) console.error(beboerError);
  const beboer = beboerData.hentBeboer;

  console.log(pin);

  return (
    <>
      <Container sx={{ py: 10 }}>
        <Box mb={3}>
          <Link href="/resepsjonen" passHref>
            <Button color="inherit" variant="outlined" startIcon={<ArrowBack />}>
              Gå tilbake
            </Button>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Skriv inn pinkode for {beboer.fornavn + " " + beboer.etternavn}
          </Typography>
          <NumberPad code={(num) => setPin(num)} />
        </Box>
      </Container>
    </>
  );
};

export default PinPage;
