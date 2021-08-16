export interface IUserData {
  id: number;
  name: string;
  role: number;
  language: number;
}

export interface AuthState {
  token: string;
  user: IUserData;
}
