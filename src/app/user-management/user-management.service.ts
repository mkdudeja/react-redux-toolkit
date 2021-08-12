import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { appConstants } from "../shared/config";
import { IToggleStatus } from "../shared/interfaces";
import { helper } from "../shared/utils";
import { RootState } from "../state";
import { webApi } from "../state/middlewares";
import { IUserDetails } from "./user-management.interface";

type UsersResponse = Array<IUserDetails>;
const keysToParse = ["id", "role", "language", "is_active", "is_deleted"];

export const userAdapter = createEntityAdapter<IUserDetails>({
  sortComparer: (a, b) => b.id - a.id,
});

const extendedApi = webApi
  .enhanceEndpoints({
    addTagTypes: ["User"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<EntityState<IUserDetails>, void>({
        query: () => appConstants.urls.getAllUsers,
        transformResponse: (response: UsersResponse) => {
          const result = response.map((user) =>
            helper.parseObjectForInt<IUserDetails>(user, keysToParse)
          );
          return userAdapter.addMany(userAdapter.getInitialState(), result);
        },
        providesTags: (result) => {
          console.log("result", result);
          return [{ type: "User", id: "LIST" }];
        },
      }),
      addUser: builder.mutation({
        query: (payload: IUserDetails) => ({
          url: appConstants.urls.saveUser,
          method: "POST",
          body: payload,
        }),
        onQueryStarted: (user, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            extendedApi.util.updateQueryData("getUsers", undefined, (draft) => {
              userAdapter.addOne(draft, user);
            })
          );

          queryFulfilled.catch(patchResult.undo);
        },
      }),
      deleteUser: builder.mutation<boolean, number>({
        query: (userId: number) => ({
          url: appConstants.urls.deleteUser,
          method: "POST",
          body: { id: userId },
        }),
        onQueryStarted: async (userId, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            extendedApi.util.updateQueryData("getUsers", undefined, (draft) => {
              userAdapter.removeOne(draft, userId);
            })
          );
          queryFulfilled.catch(patchResult.undo);
        },
      }),
      updateUser: builder.mutation({
        query: (payload: IUserDetails) => ({
          url: appConstants.urls.updateUser,
          method: "POST",
          body: payload,
        }),
        onQueryStarted: ({ id, ...changes }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            extendedApi.util.updateQueryData("getUsers", undefined, (draft) => {
              userAdapter.updateOne(draft, {
                id,
                changes,
              });
            })
          );

          queryFulfilled.catch(patchResult.undo);
        },
      }),
      updateStatus: builder.mutation({
        query: (payload: IToggleStatus) => ({
          url: appConstants.urls.updateStatus,
          method: "POST",
          body: payload,
        }),
        onQueryStarted: ({ id, status }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            extendedApi.util.updateQueryData("getUsers", undefined, (draft) => {
              userAdapter.updateOne(draft, {
                id,
                changes: {
                  is_active: status,
                },
              });
            })
          );

          queryFulfilled.catch(patchResult.undo);
        },
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateStatusMutation,
} = extendedApi;

// create selectors for user's data
const { getUsers } = extendedApi.endpoints,
  { selectAll } = userAdapter.getSelectors(),
  selectGetUsers = (state: RootState) =>
    getUsers.select()(state).data ||
    ({ ids: [], entities: {} } as EntityState<IUserDetails>);

export const selectAllUsers = createSelector(selectGetUsers, selectAll);
