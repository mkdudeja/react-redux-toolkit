import React from "react";
import { authActions, authSelectors } from "../../state/auth";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import * as loginActions from "./state/login.actions";

const Login: React.FC = () => {
  const dispatch = useAppDispatch(),
    isAuthorized = useAppSelector(authSelectors.isAuthorized),
    user = useAppSelector(authSelectors.currentUser);

  async function handleLogin() {
    try {
      const response = await dispatch(
        loginActions.login({
          username: "admin@aiis.com",
          password: "1234",
        })
      ).unwrap();

      dispatch(authActions.setCredentials(response));
    } catch (error) {}
  }

  function handleLogout() {
    dispatch(authActions.resetCredentials());
  }

  return (
    <div className="wrapper">
      {isAuthorized ? (
        <div className="">
          <h1>{user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;
