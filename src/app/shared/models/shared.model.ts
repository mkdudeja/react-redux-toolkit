import { IError } from "../interfaces";

export class ErrorModel implements IError {
  status: null | number;
  message: string;
  constructor(status: null | number, message: string) {
    this.status = status;
    this.message = message;
  }
}
