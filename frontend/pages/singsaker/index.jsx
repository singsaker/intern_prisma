import React, { useState } from "react";

// Components
import BeboerListe from "../../components/singsaker/BeboerListe";
import VervListe from "../../components/singsaker/VervListe";
import ProfilCard from "../../components/ProfilCard";
import VervCard from "../../components/VervCard";
import Layout from "../../components/Layout";
import Statistikk from "../../components/singsaker/Statistikk";

// Next
import Head from "next/head";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { Card } from "@material-ui/core";

const Singsaker = () => {
  const [beboerModal, setBeboerModal] = useState(false);
  const [aapmendListeModal, setAapmendListeModal] = useState(false);
  const [beboerId, setBeboerId] = useState(null);
  const [beboerListe, setBeboerListe] = useState(null);
  const [vervModal, setVervModal] = useState(false);
  const [vervId, setVervId] = useState(null);

  const [tab, setTab] = useState("beboere");

  const toggleBeboerModal = (id) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  const togggleAapmendListeModal = (beboere) => {
    if (!aapmendListeModal) {
      setBeboerListe(beboere);
    }
    setAapmendListeModal(!aapmendListeModal);
  };

  const toggleVervModal = (id) => {
    if (!vervModal) {
      setVervId(id);
    }
    setVervModal(!vervModal);
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <Head>
        <title>Singsaker | Internsida</title>
      </Head>

      {/* Beboermodal: */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <ProfilCard
          toggleBeboerModal={toggleBeboerModal}
          beboer_id={beboerId}
        />
      </Dialog>

      {/* Modal med liste over aktuelle aapmend: */}
      <Dialog
        onClose={togggleAapmendListeModal}
        aria-labelledby="simple-dialog-title"
        open={aapmendListeModal}
      >
        <DialogTitle id="simple-dialog-title">Aapmend</DialogTitle>
        <List>
          {beboerListe !== null &&
            beboerListe.map((beboer) => (
              <ListItem
                button
                onClick={() => toggleBeboerModal(beboer.id)}
                key={beboer.id}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${beboer.fornavn} ${beboer.etternavn}`}
                />
              </ListItem>
            ))}
        </List>
      </Dialog>

      {/* Vervmodal: */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={vervModal}
        onClose={toggleVervModal}
      >
        <VervCard toggleVervModal={toggleVervModal} verv_id={vervId} />
      </Dialog>

      <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Beboerliste" value="beboere" />
          <Tab label="Verv" value="verv" />
          <Tab label="Statistikk" value="statistikk" />
        </Tabs>
      <Card sx={{mt: 5}}>
        <div role="tabpanel" hidden={tab !== "beboere"}>
          <BeboerListe toggleBeboer={(id) => toggleBeboerModal(id)} />
        </div>
        <div role="tabpanel" hidden={tab !== "verv"}>
          <VervListe
            toggleVervModal={(id) => toggleVervModal(id)}
            toggleBeboer={(id) => toggleBeboerModal(id)}
            toggleAapmendListe={(aapmend) => togggleAapmendListeModal(aapmend)}
          />
        </div>
        <div role="tabpanel" hidden={tab !== "statistikk"}>
          <Statistikk />
        </div>
      </Card>
    </Layout>
  );
};

export default Singsaker;
