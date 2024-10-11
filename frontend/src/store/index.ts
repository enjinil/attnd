import { configureStore } from "@reduxjs/toolkit";
import authReducer, { userLoggedIn } from "../features/auth/store/auth-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { addLoginObserver, addLogoutObserver } from "../lib/auth-provider";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

addLoginObserver(({ token, ...user }) => {
  store.dispatch(
    userLoggedIn({
      user,
      token,
    })
  );
});
addLogoutObserver(() => {
  // Reset state in memory by reloading
  window.location.reload();
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
