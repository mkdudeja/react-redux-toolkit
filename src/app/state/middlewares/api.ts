import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConstants } from "../../shared/config";
import { RootState } from "../store";

// initialize an empty api service that we'll inject endpoints into later as needed
const webApi = createApi({
  refetchOnFocus: true, // Re-fetching on window focus
  refetchOnReconnect: true, // Re-fetching on network reconnection
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 30, // Encouraging re-fetching
  baseQuery: fetchBaseQuery({
    baseUrl: appConstants.urls.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default webApi;
