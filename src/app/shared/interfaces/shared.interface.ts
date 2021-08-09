export interface IServerError {
  status: boolean;
  error: string | Array<string>;
}

export interface IToggleStatus {
  id: number;
  status: number;
}
