import { useEffect, useState } from "react";
import { getToken, logout } from "../../../lib/auth-provider";
import { gqlRequest } from "../../../lib/graphql-client";
import { useAppDispatch } from "../../../hooks/store";
import { userLoggedIn } from "../store/auth-slice";
import { ME } from "../auth-gqls";

export default function useBootstrapUser() {
  const token = getToken();
  const [isLoading, setIsLoading] = useState(!!token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    gqlRequest(ME)
      .then((result) => {
        dispatch(
          userLoggedIn({
            user: result.data.me,
            token,
          })
        );
        setIsLoading(false);
      })
      .catch(() => {
        logout();
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading };
}
