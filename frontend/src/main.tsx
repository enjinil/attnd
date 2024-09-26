import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { queryClient, QueryClientProvider } from "./lib/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
