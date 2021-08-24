import { GET_VERV_TYPE, LOGG_UT_TYPE } from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  verv: {},
};

export default function verv(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_VERV_TYPE:
      return {
        ...state,
        verv: _.mapKeys(action.payload, (verv) => {
          return verv.id;
        }),
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
