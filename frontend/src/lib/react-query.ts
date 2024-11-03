import { QueryClient, QueryClientProvider } from "react-query";
import { addLoginObserver, addLogoutObserver } from "./auth-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      refetchOnReconnect: false,
    },
  },
});

addLoginObserver(() => queryClient.refetchQueries());

addLogoutObserver(() => {
  queryClient.clear();
  queryClient.refetchQueries();
});

export { queryClient, QueryClientProvider };
