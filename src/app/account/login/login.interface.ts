import { RequestState } from "../../shared/config";

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
