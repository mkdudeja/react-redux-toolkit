import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import * as accountService from "../../account.service";
import { ILoginRequest, ILoginResponse } from "../login.interface";

export const loginHandler: AsyncThunkPayloadCreator<
  ILoginResponse,
  ILoginRequest
> = async (data: ILoginRequest, { rejectWithValue }) => {
  try {
    const response = await accountService.login(data);
    return response;
  } catch (error) {
    throw error;
  }
};
