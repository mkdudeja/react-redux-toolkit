Scaffold application bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/).

Application code has been written in TypeScript for type safety and to minimize the run time errors.

## Available Features

### Branch: `main`

- Authentication: Form based authentication. Upon success, storing the auth information in the redux store.
- Authorization: Role based access to private routes.
- Axios configuration: Axios has been configured with `nprogress`, `request interceptor`, and `response interceptor` to manage progress bar, request headers, and error handling at the common layer.
- Folder structure: Feature based folder structure pattern is being adopted.

  - `src`: Source code for the application.
  - `src/assets`: Static assets like `fonts`, `images`, and `.scss` partials.
  - `src/app`: Source for the application features.
  - `src/app/state`: Store configuration and app level state management like `auth`. It shouldn't be used for any feature level state management.
  - `src/app/shared`: Shared entities for the application. Primarily holds `components`, `config`, `services`, `interfaces`, `models`, and `utils`.
  - `src/app/[FEATURE_NAME]`: Each folder in the `app` root except `(state, shared)` represents the feature and will hold the files and folders needed around that features. The general gist of files (but not limited to) will be as follow:
    - `[FEATURE_NAME].component.tsx`
    - `[FEATURE_NAME]-router.component.tsx`
    - `[FEATURE_NAME].interface.ts`
    - `[FEATURE_NAME].model.ts`
    - `[FEATURE_NAME].service.ts`
    - `state/[FEATURE_NAME].actions.ts`
    - `state/[FEATURE_NAME].effects.ts`
    - `state/[FEATURE_NAME].selectors.ts`
    - `state/[FEATURE_NAME].reducer.ts`

  Refer to the `account` feature folder to get an idea of the above defined files and folder structure.

### Branch: `entity-adapter`

`redux-toolkit` provides a wrapper around `redux-thunk` for side effects management and helps to reduce the boilerplate code required for creating and dispatching actions. `createAsyncThunk` is the utility provides by the redux toolkit.

- Language: Language management feature (feature folder `language`) has been implemented using `createAsyncThunk` and saving the data in the normalized form using `entity-adapter`. CRUD operations have been implemented with `redux-toolkit`. It uses Axios to make HTTP calls for data fetch/ updates.

### Branch: `rtk-query`

`rtk-query` (inspired from the `react-query`) helps by reducing the boilerplate code around server data state management and provides hooks to be called for data fetch/ updates.

- User management: The user management feature (feature folder `user-management`) has been developed using `rtk-query`.
  - Code splitting: Implemented as partial service and added to the global `rtk-query` configuration at run time to keep the initial bootstrap as minimum as possible.
  - Optimistic updates - Though tags can be added to queries to invalidate any piece of data, the User management feature implements optimistic updates where the data state is updated with the changes without fetching the whole data.
  - Normalized data: Data is stored in the normalized form `(entity adapter)` in the store and selectors have been applied on top of that to return the data in the required form to the component.
  - Axios integration: Axios wrapper `(axiosBaseQuery)` has been integrated with `rtk-query` to take advantage of other shared features implemented with Axios like nprogress, request interceptor, and response interceptor. Thay way, whether we use rtk-query or direct Axios instance user experience, request handling, and error handling will remain the same around the application.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
