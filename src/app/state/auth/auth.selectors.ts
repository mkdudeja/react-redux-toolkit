import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// define auth selectors
export const authState = (state: RootState) => state.auth;
export const currentUser = createSelector(authState, (state) => state.user);
export const isAuthorized = createSelector(authState, (state) => !!state.token);
