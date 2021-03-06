import React from "react";
import { useAppSelector } from "../../state";
import { authSelectors } from "../../state/auth";

function useAuthState() {
  const { token, user } = useAppSelector(authSelectors.authState);

  return React.useMemo(() => ({ token, user }), [token, user]);
}

export default useAuthState;
