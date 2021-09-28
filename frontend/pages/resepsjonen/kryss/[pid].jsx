import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Tooltip,
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
  Stack,
  CardActionArea,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { GET_BEBOER_KRYSS } from "../../../src/query/beboer";
import { GET_AKTIV_DRIKKE } from "../../../src/query/kryss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import { motion, AnimatePresence } from "framer-motion";
import { alpha, useTheme } from "@material-ui/core/styles";

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

const LAG_KRYSS = gql`
  mutation LagKryss($beboer_id: Int!, $drikke_id: Int!, $antall: Int!) {
    lagKryss(beboer_id: $beboer_id, drikke_id: $drikke_id, antall: $antall, pin: 0) {
      beboer {
        fornavn
      }
    }
  }
`;

const Kryss = () => {
  const router = useRouter();
  const theme = useTheme();
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
  const [mutateFunction, { error }] = useMutation(LAG_KRYSS);

  if (error) {
    console.log(error);
  }

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

  const activeRootStyle = {
    color: "secondary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  const rootStyle = {
    bgcolor: "grey.700",
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
              <Grid container spacing={2}>
                {drikke.map((d) => (
                  <Grid key={d.id} item xs={4}>
                    <Tooltip
                      TransitionProps={{ sx: { bgcolor: "grey.900", p: 1 } }}
                      title={d.kommentar.replace("\r\n", ", ")}
                    >
                      <Card
                        sx={{
                          ...(d.navn == valg ? activeRootStyle : rootStyle),
                        }}
                      >
                        <CardActionArea onClick={() => handleChange(event, d.navn)} sx={{}}>
                          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 2 }}>
                            <Box
                              sx={{ width: 1 / 3, height: 80, objectFit: "cover" }}
                              component="img"
                              alt="profile"
                              src={"https://picsum.photos/seed/" + d.id + "/200/300"}
                            />
                            <Box
                              py={2}
                              pr={2}
                              display="flex"
                              alignItems="center"
                              flexGrow="1"
                              justifyContent="space-between"
                            >
                              <Typography variant="subtitle2">{d.navn}</Typography>
                              <Checkbox checked={d.navn == valg} color="secondary" />
                            </Box>
                          </Stack>
                        </CardActionArea>
                      </Card>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
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
                    [valg]: {
                      amount: removeCheck ? -amount : amount,
                      pris: drikke.find((el) => el.navn == valg).pris,
                      id: drikke.find((el) => el.navn == valg).id,
                    },
                  });
                  pantCheck &&
                    updateState({
                      Pant: {
                        amount: amount,
                        pris: drikke.find((el) => el.navn == "Pant").pris,
                        id: drikke.find((el) => el.navn == "Pant").id,
                      },
                    });
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
            <Grid xs={4} item>
              <Paper sx={{ p: 3, bgcolor: "grey.900", height: "100%", display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  Oppsummering
                </Typography>
                <List sx={{ mb: 1, flexGrow: 1 }}>
                  {state != null ? (
                    <AnimatePresence>
                      {Object.entries(state).map(
                        (item, id) =>
                          item[1] != null && (
                            <motion.div
                              animate={{ y: 0, opacity: 1 }}
                              initial={{ y: 5, opacity: 0 }}
                              exit={{ y: 0, opacity: 0 }}
                              transition={{
                                x: { type: "spring", stiffness: 100, duration: 0.4 },
                                default: { duration: 0.1 },
                              }}
                              key={id}
                            >
                              <ListItem
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
                            </motion.div>
                          )
                      )}
                    </AnimatePresence>
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
                <Button
                  onClick={() => {
                    Object.entries(state).map((item) => {
                      if (item[1] != undefined) {
                        mutateFunction({
                          variables: { beboer_id: parseInt(pid), drikke_id: item[1].id, antall: item[1].amount },
                        });
                      }
                    });
                    router.push("/resepsjonen");
                  }}
                  fullWidth
                  variant="contained"
                  size="large"
                  color="secondary"
                >
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
