import React from "react";

// Material-UI
import { Grid, CircularProgress, Divider, Card, CardContent, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { useSelector } from "react-redux";

const Verv = (props) => {
  const verv = useSelector((state) => state.verv.verv[props.verv_id]);

  if (!verv)
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Card variant="outlined" style={{ maxHeight: "800px" }}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item></Grid>
          <Grid item>
            <CloseIcon onClick={() => props.toggleVervModal()} style={{ cursor: "pointer", margin: "8px" }} />
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12} container justify="center">
            <Typography color="secondary" variant="h4">
              {verv.navn}
            </Typography>
          </Grid>

          <Divider variant="middle" />

          <Grid item container spacing={2}>
            <Grid item container justify="flex-end" xs={6}>
              <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>Regitimer</Typography>
            </Grid>
            <Grid item container xs={6}>
              <Typography style={{ fontSize: "18px" }} color="textSecondary">
                {verv.regitimer}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item container justify="flex-end" xs={6}>
              <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>Utvalget</Typography>
            </Grid>
            <Grid item container xs={6}>
              <Typography style={{ fontSize: "18px" }} color="textSecondary">
                {verv.utvalg ? "Ja" : "Nei"}
              </Typography>
            </Grid>
          </Grid>
          {verv.epost && (
            <Grid item container spacing={2}>
              <Grid item container justify="flex-end" xs={6}>
                <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>Epost</Typography>
              </Grid>
              <Grid item container xs={6}>
                <a style={{ fontSize: "18px" }} href={`mailto:${verv.epost}`}>
                  {verv.epost}
                </a>
              </Grid>
            </Grid>
          )}

          <Divider variant="middle" />
          <Typography
            component="pre"
            color="textSecondary"
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {verv.beskrivelse}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );

  // Kan dette fjernes?

  // return (
  //   <Card bg="dark" text="white">
  //     <Card.Header>
  //       <Card.Title style={{ textAlign: "center" }}>
  //         <h2>{verv.navn}</h2>
  //       </Card.Title>
  //     </Card.Header>
  //     <Card.Body
  //       style={{
  //         maxHeight: "400px",
  //         overflow: "auto",
  //         backgroundColor: "#212026",
  //       }}
  //     >
  //       <hr
  //         style={{
  //           height: "2px",
  //           borderWidth: "0",
  //           color: "#F28599",
  //           backgroundColor: "#F28599",
  //           marginTop: "1rem",
  //           width: "90%",
  //           marginRight: "5%",
  //           marginLeft: "5%",
  //         }}
  //       />

  //       <Container>
  //         {verv.epost && (
  //           <Row>
  //             <Col style={{ textAlign: "right", fontWeight: "bold" }} sm={4}>
  //               Epost
  //             </Col>
  //             <Col sm={8}>
  //               <a href={`mailto:${verv.epost}`}>{verv.epost}</a>
  //             </Col>
  //           </Row>
  //         )}

  //         <Row>
  //           <Col style={{ textAlign: "right", fontWeight: "bold" }} sm={4}>
  //             Regitimer
  //           </Col>
  //           <Col sm={8}>{verv.regitimer}</Col>
  //         </Row>
  //         <Row>
  //           <Col style={{ textAlign: "right", fontWeight: "bold" }} sm={4}>
  //             Utvalget
  //           </Col>
  //           <Col sm={8}>{verv.utvalg ? "Ja" : "Nei"}</Col>
  //         </Row>
  //         <hr
  //           style={{
  //             height: "2px",
  //             borderWidth: "0",
  //             color: "#F28599",
  //             backgroundColor: "#F28599",
  //             marginTop: "1rem",
  //             width: "90%",
  //             marginRight: "5%",
  //             marginLeft: "5%",
  //           }}
  //         />
  //         <Row>{verv.beskrivelse}</Row>
  //       </Container>
  //     </Card.Body>
  //   </Card>
  // );
};

export default Verv;
