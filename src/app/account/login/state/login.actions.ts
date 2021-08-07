import { createAsyncThunk } from "@reduxjs/toolkit";
import * as loginEffects from "./login.effects";

// defined actions
export const login = createAsyncThunk(
  "account/login",
  loginEffects.loginHandler
);
