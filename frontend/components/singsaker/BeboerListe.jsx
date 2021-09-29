import React, { useState } from "react";

// Components
import Spinner from "../CustomSpinner";
import BeboerListeToolbar from "./BeboerListeToolbar";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBeboere } from "../../src/actions/beboer";
import { GET_BEBOERE } from "../../src/query/beboer";

// Misc
import { filter } from "lodash";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack, TablePagination } from "@mui/material";

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        (_user.mellomnavn
          ? `${_user.fornavn} ${_user.mellomnavn} ${_user.etternavn}`
          : `${_user.fornavn} ${_user.etternavn}`
        )
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const BeboerListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterName, setFilterName] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredUsers = applySortFilter(beboere, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - beboere.length) : 0;

  const { loading } = useQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  if (loading || beboere.length < 1) return <Spinner />;
  return (
    <Paper>
      <BeboerListeToolbar filterName={filterName} onFilterName={handleFilterByName} />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Navn</TableCell>
              <TableCell>Epost</TableCell>
              <TableCell>Studie</TableCell>
              <TableCell>Universitet</TableCell>
              <TableCell>Rom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const { id, fornavn, mellomnavn, etternavn, epost, studie, skole, rom, rolle } = row;

              return (
                <TableRow
                  style={{ cursor: "pointer" }}
                  onClick={() => props.toggleBeboer(id)}
                  hover
                  key={id}
                  tabIndex={-1}
                >
                  <TableCell sx={{ pl: 3 }} component="th" scope="row">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar variant="circular" />
                      <Typography variant="subtitle2" noWrap>
                        {mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{epost}</TableCell>
                  <TableCell align="left">{studie && studie.navn}</TableCell>
                  <TableCell align="left">{skole.navn}</TableCell>
                  <TableCell align="left">
                    <Chip variant="outlined" avatar={<Avatar>#</Avatar>} label={rom && rom.navn} />
                  </TableCell>
                  <TableCell sx={{ pr: 3 }} align="right">
                    {rolle.navn}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {isUserNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  Ingen resultat
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <TablePagination
          rowsPerPageOptions={[25, 50, 150]}
          component="div"
          count={beboere.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default BeboerListe;
