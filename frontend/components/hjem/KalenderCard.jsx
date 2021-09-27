import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
const KalenderCard = (props) => {

    return (
        <Grid container direction="column" spacing={2} style={{ padding: "10px" }}>
            <Grid item container justify="space-between">
                <Grid item>
                    <Typography color="primary" variant="h4">
                        {props.dato}
                    </Typography>
                </Grid>
                <Grid item>
                    <CloseIcon
                        onClick={() => props.toggleSeDetaljertDag()}
                        style={{ cursor: "pointer", margin: "8px" }}
                    />
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

                {(props.bursdager).length == 0 ? "Ingen bursdager i dag." :
                    <List>
                        {
                            (props.bursdager).map(bursdag =>
                                <ListItem>{bursdag.fornavn + " " + bursdag.etternavn}</ListItem>)
                        }

                    </List>}
            </Grid>
        </Grid>
    )

}

export default KalenderCard;