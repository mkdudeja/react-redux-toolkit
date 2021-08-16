import { isPlainObject, SerializedError } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { MaybePromise, Override } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { AxiosRequestConfig } from "axios";
import urljoin from "url-join";
import axiosInstance from "../../shared/services/axios.service";

declare type CustomAxiosInit = Override<
  AxiosRequestConfig,
  {
    headers?:
      | Headers
      | string[][]
      | Record<string, string | undefined>
      | undefined;
  }
>;

export declare type AxiosBaseQueryArgs = {
  baseUrl?: string;
  prepareHeaders?: (
    headers: Headers,
    api: {
      getState: () => unknown;
    }
  ) => MaybePromise<Headers>;
} & AxiosRequestConfig;

export interface AxiosArgs extends CustomAxiosInit {
  url: string;
  params?: Record<string, any>;
  body?: any;
}

function stripUndefined(obj: any) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const copy: Record<string, any> = { ...obj };
  for (const [k, v] of Object.entries(copy)) {
    if (typeof v === "undefined") delete copy[k];
  }
  return copy;
}

function axiosBaseQuery({
  baseUrl,
  prepareHeaders = (x) => x,
  ...baseAxiosOptions
}: AxiosBaseQueryArgs = {}): BaseQueryFn<
  string | AxiosArgs,
  unknown,
  SerializedError
> {
  return async (arg, { getState }) => {
    let {
      url,
      method = "GET" as const,
      headers = {},
      body: data = undefined,
      params = undefined,
      ...rest
    } = typeof arg == "string" ? { url: arg } : arg;

    // prepare axios config request
    const config: AxiosRequestConfig = {
        ...baseAxiosOptions,
        method,
        data,
        ...rest,
      },
      requestHeaders = await prepareHeaders(
        new Headers(stripUndefined(headers)),
        { getState }
      );

    // prepare query params
    if (params) {
      const divider = ~url.indexOf("?") ? "&" : "?";
      const query = new URLSearchParams(stripUndefined(params));
      url += divider + query;
    }

    config.url = urljoin(baseUrl, url);
    config.data = JSON.stringify(config.data);
    config.headers = requestHeaders.values();

    try {
      const result = await axiosInstance(config);
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: axiosError as SerializedError,
      };
    }
  };
}

export default axiosBaseQuery;
