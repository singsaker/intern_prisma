import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Drikke query
import { GET_DRIKKER } from "../../../src/query/drikke";
import { getDrikker } from "../../../src/actions/drikke";

// Misc
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "650px",
    },
});

const DrikkeListe = (props) => {
    const dispatch = useDispatch();
    const [errorMelding, setErrorMelding] = useState("");
    const classes = useStyles();

    useQuery(GET_DRIKKER, {
        onCompleted(data) {
            dispatch(getDrikker(data));
        }
    });

    const drikker = useSelector(state => Object.values(state.drikke.drikke));

    return (
        <Paper variant="outlined" className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Navn</TableCell>
                            <TableCell>Pris</TableCell>
                            <TableCell>Aktiv</TableCell>
                            <TableCell>Farge</TableCell>
                            <TableCell>Kommentar</TableCell>
                            <TableCell>Produktnummer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drikker.map((drikke) => {
                            return (
                                <TableRow onClick={() => props.toggleOppdaterDrikke(drikke.id)} hover style={{ cursor: "pointer" }} key={drikke.id}>
                                    <TableCell>
                                        <Typography
                                            variant="subtitle1"
                                            color="textPrimary"
                                        >
                                            {drikke.navn}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {drikke.pris}
                                    </TableCell>
                                    <TableCell>
                                        {drikke.aktiv ? "Aktiv" : "Ikke aktiv"}
                                    </TableCell>
                                    <TableCell>
                                        <input type="color" disabled value={drikke.farge}></input>
                                    </TableCell>
                                    <TableCell>
                                        {drikke.kommentar}
                                    </TableCell>
                                    <TableCell>
                                        {drikke.produktnr === null ? "Ikke spesifisert" : drikke.produktnr}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default DrikkeListe;
