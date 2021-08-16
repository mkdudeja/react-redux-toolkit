import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IServerError } from "../interfaces";
import { helper } from "../utils";

const responseInterceptor = (error: AxiosError<IServerError>) => {
  let errorMessages = [],
    responseData = helper.getPropertyValue<IServerError>(
      error,
      "response.data"
    );

  if (responseData) {
    // server-side error
    if (typeof responseData.error === "string") {
      errorMessages.push(responseData.error);
    } else if (Array.isArray(responseData.error) && responseData.error.length) {
      errorMessages = responseData.error;
    } else {
      errorMessages.push(
        "Some server error occured. Please try again later or contact system administrator."
      );
    }
  } else {
    errorMessages.push(error.message);
  }

  // throw an error to services/ components
  const code = helper.getPropertyValue<number>(error, "response.status");
  return Promise.reject<SerializedError>({
    code: code ? code.toString() : error.code,
    name: error.name,
    message: JSON.stringify(errorMessages),
  });
};

export default responseInterceptor;
