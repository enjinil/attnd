import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPersistedUser } from "../../../lib/auth-provider";

interface AuthState {
  user: null | { email: string; role: string };
  token: null | string;
}

const user = getPersistedUser();

const initialState: AuthState = {
  user: user ? { email: user.email, role: user.role } : null,
  token: user ? user.token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, { payload }: PayloadAction<AuthState>) {
      if (!payload.user) return;
      state.user = payload.user;
      state.token = payload.token;
    },
    userLoggedOut(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
