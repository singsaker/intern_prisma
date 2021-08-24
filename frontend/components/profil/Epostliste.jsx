import React from "react";
import { connect } from "react-redux";

const Epostliste = (props) => {
  return <div>Epostliste</div>;
};

const mapStateToProps = (state) => {
  return {
    beboerId: state.auth.beboer_id,
  };
};

export default connect(mapStateToProps)(Epostliste);
