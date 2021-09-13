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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { GET_BEBOER_KRYSS } from "../../../src/query/beboer";
import { GET_AKTIV_DRIKKE } from "../../../src/query/kryss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";

import Link from "next/link";
import Spinner from "../../../components/resepsjonen/Spinner";

function useObjectReducer(PropsWithDefaultValues) {
  const [state, dispatch] = useReducer(reducer, PropsWithDefaultValues);

  //newFieldsVal={[field_name]: [field_value], ...}
  function reducer(state, newFieldsVal) {
    return { ...state, ...newFieldsVal };
  }

  return [
    state,
    (newFieldsVal, newVal) => {
      if (typeof newVal !== "undefined") {
        const tmp = {};
        tmp[newFieldsVal] = newVal;
        dispatch(tmp);
      } else {
        dispatch(newFieldsVal);
      }
    },
  ];
}

const Kryss = () => {
  const router = useRouter();
  const { pid } = router.query;
  const {
    data: beboerKryssData,
    loading: beboerLoading,
    error: beboerError,
  } = useQuery(GET_BEBOER_KRYSS, {
    variables: {
      id: parseInt(pid),
    },
  });
  const { data: drikkeData, loading: drikkeLoading, error: drikkeError } = useQuery(GET_AKTIV_DRIKKE);
  const [valg, setValg] = useState("Pant");
  const [amount, setAmount] = useState(1);
  const [state, updateState] = useObjectReducer();
  const [removeCheck, setRemoveCheck] = useState(false);
  const [pantCheck, setPantCheck] = useState(false);

  if (beboerLoading || drikkeLoading) return <Spinner />;
  if (beboerError) console.error(beboerError);
  if (drikkeError) console.error(drikkeError);

  const beboer = beboerKryssData.hentBeboerKryss;
  const drikke = drikkeData.hentAktivDrikke;

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
          <Grid container spacing={3}>
            <Grid xs item sx={{ m: 2, mb: 1 }}>
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
              <FormGroup sx={{ mb: 2 }}>
                <FormControlLabel
                  checked={pantCheck}
                  onChange={() => setPantCheck(!pantCheck)}
                  control={<Checkbox />}
                  label="Jeg vil pante boksen hjemme"
                />
                <FormControlLabel
                  checked={removeCheck}
                  onChange={() => setRemoveCheck(!removeCheck)}
                  control={<Checkbox />}
                  label="Fjern kryss"
                />
              </FormGroup>
              <Button
                onClick={() => {
                  updateState({
                    [valg]: { amount: removeCheck ? -amount : amount, pris: drikke.find((el) => el.navn == valg).pris },
                  });
                  pantCheck &&
                    updateState({ Pant: { amount: amount, pris: drikke.find((el) => el.navn == "Pant").pris } });
                  setAmount(1);
                }}
                variant="outlined"
                fullWidth
                color="inherit"
                size="large"
              >
                Oppdater
              </Button>
            </Grid>
            <Grid xs={5} item>
              <Paper sx={{ p: 3, bgcolor: "grey.900", height: "100%", display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  Oppsummering
                </Typography>
                <List sx={{ mb: 1, flexGrow: 1 }}>
                  {state != null ? (
                    Object.entries(state).map(
                      (item, id) =>
                        item[1] != null && (
                          <ListItem
                            key={id}
                            disableGutters
                            secondaryAction={
                              <IconButton
                                onClick={() => updateState({ [item[0]]: undefined })}
                                edge="end"
                                aria-label="comments"
                              >
                                <CloseIcon />
                              </IconButton>
                            }
                          >
                            <Grid container justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                                  {item[1].amount}x {item[0]}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Chip label={item[1].pris + " kr"} size="small" />
                              </Grid>
                            </Grid>
                          </ListItem>
                        )
                    )
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
                      <Typography variant="h6">
                        {state != null
                          ? Object.entries(state)
                              .map(
                                (a) =>
                                  a[1] != null && (a[0] == "Pant" ? -a[1].pris * a[1].amount : a[1].pris * a[1].amount)
                              )
                              .reduce((a, b) => a + b, 0) + " Kr"
                          : "0 Kr"}
                      </Typography>
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
