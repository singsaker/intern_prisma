import { useQuery } from "@apollo/react-hooks";
import { GET_AKTIV_DRIKKE, GET_AKTIV_VIN } from "../query/kryss";
import {
  GET_KRYSSELISTE_TYPE,
  GET_AKTIV_VIN_TYPE,
  GET_AKTIV_DRIKKE_TYPE,
} from "../types";

export const getKrysseliste = (data) => {
  return {
    type: GET_KRYSSELISTE_TYPE,
    payload: data.hentKrysseliste,
  };
};

export const getAktivVin = () => (dispatch) =>
  useQuery(GET_AKTIV_VIN, {
    onCompleted(data) {
      dispatch({
        type: GET_AKTIV_VIN_TYPE,
        payload: data.hentAktivVin,
      });
    },
    onError(error) {
      console.log(error);
    },
  });

export const getAktivDrikke = () => (dispatch) =>
  useQuery(GET_AKTIV_DRIKKE, {
    onCompleted(data) {
      dispatch({
        type: GET_AKTIV_DRIKKE_TYPE,
        payload: data.hentAktivDrikke,
      });
    },
    onError(error) {
      console.log(error);
    },
  });
