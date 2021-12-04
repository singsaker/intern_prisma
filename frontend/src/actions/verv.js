import { GET_VERV_TYPE } from "../types";

export const leggTilVerv = (data) => {
  return {
    type: GET_VERV_TYPE,
    payload: data.leggTilVerv,
  };
};