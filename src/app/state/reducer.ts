import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "../account/state";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
