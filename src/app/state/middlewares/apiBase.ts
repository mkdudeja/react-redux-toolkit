import { createApi } from "@reduxjs/toolkit/query/react";
import { appConstants } from "../../shared/config";
import axiosBaseQuery from "./axiosBaseQuery";

// initialize an empty api service that we'll inject endpoints into later as needed
const apiBase = createApi({
  refetchOnFocus: true, // Re-fetching on window focus
  refetchOnReconnect: true, // Re-fetching on network reconnection
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 30, // Encouraging re-fetching
  baseQuery: axiosBaseQuery({
    baseUrl: appConstants.urls.baseUrl,
  }),
  endpoints: () => ({}),
});

export default apiBase;
