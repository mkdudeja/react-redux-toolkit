export interface IUserData {
  id: number;
  name: string;
  role: string;
  language: number;
}

export interface AuthState {
  token: string;
  user: IUserData;
}
