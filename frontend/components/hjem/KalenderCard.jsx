import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const KalenderCard = (props) => {
  const vaktTidspunkter = ["01:00-07:00", "07:00-13:00", "13:00-19:00", "19:00-01:00"];

  return (
    <Grid container direction="column" spacing={2} style={{ padding: "10px" }}>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography color="primary" variant="h4">
            {props.dato}
          </Typography>
        </Grid>
        <Grid item>
          <CloseIcon onClick={() => props.toggleSeDetaljertDag()} style={{ cursor: "pointer", margin: "8px" }} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="h6">
          Ting som skjer:
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="h6">
          Bursdager:
        </Typography>

        {props.bursdager.length == 0 ? (
          "Ingen bursdager i dag."
        ) : (
          <List>
            {props.bursdager.map((bursdag, index) => (
              <ListItem key={index}>{bursdag.fornavn + " " + bursdag.etternavn}</ListItem>
            ))}
          </List>
        )}
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="h6">
          Dine vakter:
        </Typography>

        {props.vakter.length == 0 ? (
          "Du har ingen vakter i dag."
        ) : (
          <List>
            {props.vakter.map((vakt, index) => (
              <ListItem key={index}>{vakt.vakttype + ". vakt (" + vaktTidspunkter[vakt.vakttype - 1] + ")"}</ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default KalenderCard;
