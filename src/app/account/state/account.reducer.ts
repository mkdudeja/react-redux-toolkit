import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "../login/state";

const accountReducer = combineReducers({
  login: loginReducer,
});

export default accountReducer;
