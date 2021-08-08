import { createReducer } from "@reduxjs/toolkit";
import { RequestState } from "../../../shared/config";
import { LoginState } from "../login.iterface";
import * as loginActions from "./login.actions";

const initialState: LoginState = {
  loading: RequestState.idle,
  error: null,
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginActions.login.pending, (state) => {
      return {
        ...state,
        error: null,
        loading: RequestState.pending,
      };
    })
    .addCase(loginActions.login.fulfilled, (state) => {
      return {
        ...state,
        error: null,
        loading: RequestState.idle,
      };
    })
    .addCase(loginActions.login.rejected, (state, action) => {
      return {
        ...state,
        loading: RequestState.idle,
        error: action.error.message,
      };
    });
});

export default loginReducer;
