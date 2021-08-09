import { createAsyncThunk } from "@reduxjs/toolkit";
import * as languageEffects from "./language.effects";

// defined actions
export const getLangauges = createAsyncThunk(
  "language/get",
  languageEffects.getLangauges
);

export const addLanguage = createAsyncThunk(
  "language/add",
  languageEffects.addLanguage
);

export const updateLanguage = createAsyncThunk(
  "language/update",
  languageEffects.updateLanguage
);

export const deleteLanaguge = createAsyncThunk(
  "language/delete",
  languageEffects.deleteLanaguge
);

export const updateStatus = createAsyncThunk(
  "language/status",
  languageEffects.updateStatus
);
