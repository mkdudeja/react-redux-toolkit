import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "../account/state";
import { authReducer } from "./auth";
import { apiBase } from "./middlewares";

const rootReducer = combineReducers({
  [apiBase.reducerPath]: apiBase.reducer,
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
