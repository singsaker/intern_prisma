import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
  List,
  ListItem,
  Chip,
  IconButton,
  Divider,
  Slider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { GET_BEBOER_KRYSS } from "../../../src/query/beboer";
import { GET_AKTIV_DRIKKE } from "../../../src/query/kryss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";

import Link from "next/link";
import Spinner from "../../../components/resepsjonen/Spinner";

const Kryss = () => {
  const router = useRouter();
  const { pid } = router.query;
  const {
    data: hentBeboerKryss,
    loading: beboerLoading,
    error: beboerError,
  } = useQuery(GET_BEBOER_KRYSS, {
    variables: {
      id: parseInt(pid),
    },
  });
  const { data, loading, error } = useQuery(GET_AKTIV_DRIKKE);
  const [valg, setValg] = useState("Pant");
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState([]);
  const updateStatus = () => {
    if (amount != 0) {
      setStatus([
        ...status,
        {
          name: valg,
          amount: amount,
        },
      ]);
      setAmount(0);
    }
  };

  if (beboerLoading || loading) {
    return <Spinner />;
  }

  if (beboerError) {
    console.error(beboerError);
    return null;
  }

  const beboer = hentBeboerKryss.hentBeboerKryss;
  const drikke = data.hentAktivDrikke;

  if (error) {
    console.error(error);
    return null;
  }

  const handleChange = (event, nyttValg) => {
    if (nyttValg !== null) {
      setValg(nyttValg);
    }
  };

  const handleAmountChange = (event, newValue) => {
    setAmount(newValue);
  };

  return (
    <>
      <Container sx={{ py: 10 }}>
        <Box mb={3}>
          <Link href="/resepsjonen" passHref>
            <Button color="inherit" variant="outlined" startIcon={<ArrowBackIcon />}>
              Gå tilbake
            </Button>
          </Link>
        </Box>
        <Typography variant="h4">Kryssing for {beboer.fornavn + " " + beboer.etternavn}</Typography>
        <Card sx={{ p: 2, mt: 5 }}>
          <Grid alignItems="stretch" container spacing={3}>
            <Grid xs item sx={{ m: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 3 }}>
                Velg vare
              </Typography>
              <ToggleButtonGroup exclusive value={valg} onChange={handleChange}>
                {drikke.map((d) => (
                  <ToggleButton value={d.navn} key={d.id}>
                    {d.navn}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box sx={{ my: 3 }}>
                <Grid container alignItems="end" spacing={3}>
                  <Grid item xs sx={{ mt: 1 }}>
                    <Slider
                      aria-label="Antall"
                      color="secondary"
                      valueLabelDisplay="auto"
                      step={1}
                      min={0}
                      max={12}
                      value={amount}
                      marks
                      onChange={handleAmountChange}
                    />
                  </Grid>
                  <Grid item>
                    <Grid alignItems="end" container spacing={1}>
                      <Grid item>
                        <Typography variant="h2">{amount}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" sx={{ mb: "11px", color: "grey.500" }}>
                          {valg}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Button onClick={() => updateStatus()} variant="outlined" fullWidth color="inherit" size="large">
                Legg til {amount} {valg}
              </Button>
            </Grid>
            <Grid xs={5} item>
              <Paper sx={{ p: 3, bgcolor: "grey.900", height: "100%" }}>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  Oppsummering
                </Typography>
                <List sx={{ mb: 1 }}>
                  {status.length != 0 ? (
                    status.map((item, id) => (
                      <ListItem
                        key={id}
                        disableGutters
                        secondaryAction={
                          <IconButton onClick={() => setStatus([])} edge="end" aria-label="comments">
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                              {item.amount}x {item.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Chip label={drikke.find((el) => el.navn == item.name).pris + " kr"} size="small" />
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem disableGutters>
                      <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                        Du har ikke valgt en vare enda.
                      </Typography>
                    </ListItem>
                  )}
                </List>
                <Divider />
                <Box sx={{ py: 3 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{37 + 25 + " Kr"}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Button fullWidth variant="contained" size="large" color="secondary">
                  Kryss
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Kryss;
