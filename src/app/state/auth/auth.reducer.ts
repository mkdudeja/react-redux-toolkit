import { createReducer } from "@reduxjs/toolkit";
import { AuthState, IUserData } from "../../shared/interfaces";
import * as authActions from "./auth.actions";

const initialState: AuthState = {
  token: null,
  user: {} as IUserData,
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
