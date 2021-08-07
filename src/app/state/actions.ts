import { createAction } from "@reduxjs/toolkit";
import { IError } from "../shared/interfaces";

export const error = createAction<IError, "app/error">("app/error");
