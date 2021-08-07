import { RequestState } from "../../shared";

export interface LoginState {
  loading: RequestState;
  error: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserData;
}

export interface IUserData {
  id: number;
  name: string;
  role: number;
  language: number;
}

export interface IAuthState extends ILoginResponse {}
