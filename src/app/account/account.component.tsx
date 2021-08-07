import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AccountRouterOutlet from "./account-router.component";

const Account: React.FC = () => {
  let { url } = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <Link to={`${url}`}>Login</Link>
        </li>
        <li>
          <Link to={`${url}/forgot-password`}>Forgot Password</Link>
        </li>
        <li>
          <Link to={`${url}/reset-password`}>Reset Password</Link>
        </li>
      </ul>

      <hr />

      <AccountRouterOutlet />
    </div>
  );
};

export default Account;
