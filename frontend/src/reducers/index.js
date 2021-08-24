import { combineReducers } from "redux";
import authReducer from "./authReducer";
import beboerReducer from "./beboerReducer";
import vaktReducer from "./vaktReducer";
import vervReducer from "./vervReducer";
import kryssReducer from "./kryssReducer";
import drikkeReducer from "./drikkeReducer";
import regiReducer from "./regiReducer";
import skoleReducer from "./skoleReducer";
import kunngjoringReducer from "./kunngjoringReducer";
import romReducer from "./romReducer";
import soknadReducer from "./soknadReducer";

export default combineReducers({
  auth: authReducer,
  beboer: beboerReducer,
  kunngjoring: kunngjoringReducer,
  vakt: vaktReducer,
  verv: vervReducer,
  kryss: kryssReducer,
  drikke: drikkeReducer,
  regi: regiReducer,
  skole: skoleReducer,
  soknader: soknadReducer,
  rom: romReducer,
});
