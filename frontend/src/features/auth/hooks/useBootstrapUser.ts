import { useEffect, useState } from "react";
import { getToken, logout } from "../../../lib/auth-provider";
import { gql } from "../../../graphql";
import { gqlRequest } from "../../../lib/graphql-client";
import { useAppDispatch } from "../../../hooks/store";
import { userLoggedIn } from "../store/auth-slice";

const ME = gql(`
  query Me{
    me {
      email
      role
      position
      name
    }
  }
`);

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
