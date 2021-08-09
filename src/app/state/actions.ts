import { createAction, SerializedError } from "@reduxjs/toolkit";

export const error = createAction<SerializedError, "app/error">("app/error");
