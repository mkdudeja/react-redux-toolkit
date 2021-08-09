import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "../account/state";
import { langaugeReducer } from "../language/state";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  language: langaugeReducer,
});

export default rootReducer;
