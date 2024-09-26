import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  userLoggedIn,
  userLoggedOut,
} from "../../features/auth/store/auth-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { addLoginObserver, addLogoutObserver } from "../../lib/auth-provider";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

addLoginObserver((user) =>
  store.dispatch(
    userLoggedIn({ user: { email: user.email }, token: user.token })
  )
);
addLogoutObserver(() => store.dispatch(userLoggedOut()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
