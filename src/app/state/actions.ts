import { createAction } from "@reduxjs/toolkit";
import { IErrorResponse } from "../shared/interfaces";

export const error = createAction<IErrorResponse, "app/error">("app/error");
