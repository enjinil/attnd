import { QueryClient, QueryClientProvider } from "react-query";
import { addLoginObserver, addLogoutObserver } from "./auth-provider";

const queryClient = new QueryClient();

addLoginObserver(() => queryClient.refetchQueries());

addLogoutObserver(() => {
  queryClient.clear();
  queryClient.refetchQueries();
});

export { queryClient, QueryClientProvider };
