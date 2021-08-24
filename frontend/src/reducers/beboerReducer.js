import _ from "lodash";
import {
  GET_GAMLE_BEBOERE_TYPE,
  GET_GAMMEL_BEBOER_TYPE,
  GET_BEBOERE_TYPE,
  GET_BEBOER_TYPE,
  GET_BEBOER_PREFS_TYPE,
  GET_BEBOER_EPOST_PREFS_TYPE,
  GET_NOEN_BEBOERE_TYPE,
  SLETT_BEBOER_TYPE,
  LOGG_UT_TYPE,
  SEND_HJEM_FRA_PERM_TYPE,
  SEND_PAA_PERM_TYPE,
  GET_PERMLISTE_TYPE,
} from "../types";

const INITIAL_STATE = {
  beboere: {},
  gamleBeboere: {},
  permliste: {},
  prefs: {},
  epostPrefs: {},
};

export default function beboer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BEBOERE_TYPE:
      return {
        ...state,
        beboere: _.mapKeys(action.payload, (beboer) => {
          return beboer.id;
        }),
      };
    case GET_GAMLE_BEBOERE_TYPE:
      return {
        ...state,
        gamleBeboere: _.mapKeys(action.payload, (beboer) => {
          return beboer.id;
        }),
      };
    case GET_BEBOER_TYPE:
      return {
        ...state,
        beboere: { ...state.beboere, [action.payload.id]: action.payload },
      };
    case GET_GAMMEL_BEBOER_TYPE:
      return {
        ...state,
        gamleBeboere: {
          ...state.gamleBeboere,
          [action.payload.id]: action.payload,
        },
      };
    case GET_BEBOER_PREFS_TYPE:
      return {
        ...state,
        prefs: { ...state.prefs, [action.payload.beboerId]: action.payload },
      };
    case GET_BEBOER_EPOST_PREFS_TYPE:
      return {
        ...state,
        epostPrefs: {
          ...state.epostPrefs,
          [action.payload.beboer_id]: action.payload,
        },
      };
    case GET_NOEN_BEBOERE_TYPE:
      let nyBeboere = state.beboere;
      action.payload.forEach((beb) => {
        nyBeboere[beb.id] = beb;
      });

      return {
        ...state,
        beboere: nyBeboere,
      };
    case SLETT_BEBOER_TYPE:
      return {
        ...state,
        beboere: _.omit(state.beboere, action.payload.id),
      };
    case SEND_HJEM_FRA_PERM_TYPE:
      return {
        ...state,
        permliste: _.omit(state.permliste, action.payload.id),
        beboere: { ...state.beboere, [action.payload.id]: action.payload },
      };
    case SEND_PAA_PERM_TYPE:
      return {
        ...state,
        beboere: _.omit(state.beboere, action.payload.id),
        permliste: { ...state.permliste, [action.payload.id]: action.payload },
      };
    case GET_PERMLISTE_TYPE:
      return {
        ...state,
        permliste: _.mapKeys(action.payload, (beboer) => {
          return beboer.id;
        }),
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
