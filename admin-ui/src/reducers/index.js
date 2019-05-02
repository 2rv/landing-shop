import { combineReducers } from "redux";
import doAuth from "./doAuth";
import getData from "./getData";

const rootReducer = combineReducers({
  doAuth,
  getData
});

export default rootReducer;
