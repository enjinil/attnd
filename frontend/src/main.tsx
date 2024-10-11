import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { queryClient, QueryClientProvider } from "./lib/react-query";
import { NotificationProvider } from "./hooks/useNotify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>
);
