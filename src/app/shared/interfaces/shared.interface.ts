export interface IErrorResponse {
  status: null | number;
  message: string;
}

export interface IServerError {
  status: boolean;
  error: string | Array<string>;
}
