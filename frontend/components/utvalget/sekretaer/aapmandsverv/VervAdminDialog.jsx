import React, {useState} from "react";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { useMutation, useQuery } from "@apollo/client";

import { UPDATE_BEBOER } from "../../../../src/query/beboer";

const VervAdminDialog = (props) => {
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [selectedBeboer, setSelectedBeboer] = useState('');

  const handleChange = (event) => {
    setSelectedBeboer(event.target.value);
  };

  const sendBeboerApiRequest = (event) => {
    console.log("Adding beboer.id: ", selectedBeboer, " to verv_id: ", props.verv_id);
    props.onClose()
  };

  // const [submitVerv, { loading }] = useMutation(UPDATE_BEBOER, {
  //   variables: {
  //     id: props.beboer_id,
  //     epost,
  //     telefon: tlf,
  //     studie_id: Number(studie_id),
  //     skole_id: Number(skole_id),
  //     fodselsdato,
  //     adresse,
  //     postnummer: Number(postnummer),
  //     klassetrinn: Number(klassetrinn),
  //     fornavn,
  //     mellomnavn,
  //     etternavn,
  //   },
  //   onCompleted(data) {
  //     props.gammelBeboer ? dispatch(oppdaterGammelBeboer(data)) : dispatch(oppdaterBeboer(data));
  //     console.log("Endring i vervliste vellykket")
  //   },
  //   onError(error) {
  //     console.error("Uhåndtert feil", error);
  //   },
  // });

  return (
    <Dialog {...props}>
      <DialogTitle>Legg til beboer på verv</DialogTitle>
      <DialogContent dividers>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="mui-select-beboer-verv-label">Beboer</InputLabel>
            <Select
              labelId="mui-select-beboer-verv-label"
              id="mui-select-beboer-verv"
              value={selectedBeboer}
              label="Beboer"
              onChange={handleChange}
            >
              {beboere.map((beboer) => (
                <MenuItem key={beboer.id} value={beboer.id}>
                  {beboer.fornavn} {beboer.etternavn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={sendBeboerApiRequest}>Legg til</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VervAdminDialog;
