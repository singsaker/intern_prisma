import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { GET_BEBOERE } from "../../src/query/beboer";
import { getBeboere } from "../../src/actions/beboer";

import { useQuery } from "@apollo/react-hooks";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Grid from "@material-ui/core/Grid";

const Bursdag = () => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [bursdagsbarn, setBursdagsbarn] = useState([]);
  const [nesteBursdagsbarn, setNesteBursdagsbarn] = useState([]);

  // Henter beboere, brukes for å finne bursdagsbarn:
  const { loading } = useQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  if (beboere.length > 0 && bursdagsbarn.length === 0 && nesteBursdagsbarn.length === 0) {
    const now = new Date();
    // Lager en liste med beboere som er neste til å ha bursdag:
    let nesteTemp = [];

    // Lager en liste med beboere som har bursdag i dag:
    const dagensBursdagsbarn = beboere.filter((beboer) => {
      const bdag = beboer.fodselsdato.split("-");
      const bursdag = new Date(now.getFullYear(), bdag[1] - 1, bdag[2]);
      let bursdagTemp;
      if (nesteTemp.length > 0) {
        const bdagTemp = nesteTemp[0].fodselsdato.split("-");
        bursdagTemp = new Date(now.getFullYear(), bdagTemp[1] - 1, bdagTemp[2]);
      }

      // Atm vil ikke dette fungere dersom beboeren som er neste til å ha bursdag har bursdag neste år
      if (now < bursdag) {
        if (nesteTemp.length === 0 || bursdag === bursdagTemp) {
          nesteTemp.push(beboer);
        } else if (bursdag < bursdagTemp) {
          nesteTemp = [beboer];
        }
      }
      return bursdag.getDate() === now.getDate() && bursdag.getMonth() === now.getMonth();
    });
    setBursdagsbarn((bursdagsbarn) => bursdagsbarn.concat(dagensBursdagsbarn));
    setNesteBursdagsbarn(nesteTemp);
  }

  if (loading)
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Card>
      <CardHeader title={bursdagsbarn.length > 0 ? "Dagens burdagsbarn" : "Neste bursdagsbarn"} />
      <CardContent
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <List>
          {bursdagsbarn.length > 0
            ? bursdagsbarn.map((b) => lagBeboerListe(b))
            : nesteBursdagsbarn.map((b) => lagBeboerListe(b))}
        </List>
      </CardContent>
    </Card>
  );
};

const lagBeboerListe = (beboer) => {
  const bdag = beboer.fodselsdato.split("-");
  return (
    <ListItem key={beboer.id} style={{ cursor: "pointer" }} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>
          <EmojiEmotionsIcon color="secondary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={beboer.fornavn + " " + beboer.etternavn}
        secondary={String(bdag[2]) + "/" + String(bdag[1])}
      />
    </ListItem>
  );
};

export default Bursdag;
