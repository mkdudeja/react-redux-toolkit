import { IErrorResponse } from "../interfaces";

export class ErrorModel implements IErrorResponse {
  status: null | number;
  message: string;
  constructor(status: null | number, message: string) {
    this.status = status;
    this.message = message;
  }
}
