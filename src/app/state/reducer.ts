import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "../account/state";
import { langaugeReducer } from "../language/state";
import { authReducer } from "./auth";
import { webApi } from "./middlewares";

const rootReducer = combineReducers({
  [webApi.reducerPath]: webApi.reducer,
  auth: authReducer,
  account: accountReducer,
  language: langaugeReducer,
});

export default rootReducer;
