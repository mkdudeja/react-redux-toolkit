import { createReducer } from "@reduxjs/toolkit";
import { appConstants } from "../../shared/config";
import { AuthState } from "../../shared/interfaces";
import { storageService } from "../../shared/services";
import * as authActions from "./auth.actions";

const initialState: AuthState = {
  token: storageService.getItem(appConstants.keys.token),
  user: storageService.getItem(appConstants.keys.user),
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authActions.resetCredentials, () => initialState)
    .addCase(authActions.setCredentials, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
});

export default authReducer;
