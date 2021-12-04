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
import CircularProgress from '@mui/material/CircularProgress'
import { useMutation, useQuery } from "@apollo/client";

import { LEGG_TIL_VERV } from "../../../../src/query/verv";

const VervAdminDialog = (props) => {
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [selectedBeboer, setSelectedBeboer] = useState('');

  const handleChange = (event) => {
    setSelectedBeboer(event.target.value);
  };

  const [leggTilVerv, { loading }] = useMutation(LEGG_TIL_VERV, {
    variables: {
      beboer_id: selectedBeboer,
      verv_id: props.verv_id
    },
    onCompleted(data) {
      console.log("Endring i vervliste vellykket")
      props.onClose()
    },
    onError(error) {
      console.error("Uhåndtert feil", error);
    },
  });

  return (
    <Dialog {...props}>
      <DialogTitle>Legg til beboer på verv</DialogTitle>
      <DialogContent dividers>
        <Box>
          {loading ? <CircularProgress /> : (
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
          )}
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={leggTilVerv}>Legg til</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VervAdminDialog;
