import { ER_INNLOGGET_TYPE, LOGG_INN_TYPE, LOGG_UT_TYPE } from "../types";
const INITIAL_STATE = {
  bruker_id: null,
  beboer_id: null,
  tilgang: {
    utvalget: false,
    kjellermester: false,
    helga: false,
    data: false,
  },
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ER_INNLOGGET_TYPE:
      return {
        ...state,
        bruker_id: action.payload.bruker_id,
        beboer_id: action.payload.beboer_id,
        tilgang: action.payload.tilgang,
      };
    case LOGG_INN_TYPE:
      return {
        ...state,
        bruker_id: action.payload.bruker_id,
        beboer_id: action.payload.beboer_id,
        tilgang: {
          utvalget: action.payload.tilgang.utvalget,
          kjellermester: action.payload.tilgang.kjellermester,
          helga: action.payload.tilgang.helga,
          data: action.payload.tilgang.data,
        },
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
