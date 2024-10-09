import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  userLoggedIn,
  userLoggedOut,
} from "../features/auth/store/auth-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { addLoginObserver, addLogoutObserver } from "../lib/auth-provider";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

addLoginObserver((user) =>
  store.dispatch(
    userLoggedIn({
      user: { email: user.email, role: user.role },
      token: user.token,
    })
  )
);
addLogoutObserver(() => {
  store.dispatch(userLoggedOut());
  window.location.reload();
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
