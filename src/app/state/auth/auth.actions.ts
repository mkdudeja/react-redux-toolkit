import { createAction } from "@reduxjs/toolkit";
import { AuthState } from "../../shared/interfaces";

export const setCredentials = createAction<AuthState>("auth/credentials/set");
export const resetCredentials = createAction("auth/credentials/reset");
