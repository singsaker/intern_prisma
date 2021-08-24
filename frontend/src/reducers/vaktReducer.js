import { GET_VAKTER_TYPE, LOGG_UT_TYPE } from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  vakter: {},
};

export default function vakt(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_VAKTER_TYPE:
      return {
        ...state,
        vakter: _.mapKeys(action.payload, (vakt) => {
          return vakt.id;
        }),
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
