import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken } from "../../../lib/auth-provider";

interface AuthState {
  user: null | { email: string; role: string; position: string; name: string };
  token: null | string;
}

const token = getToken();

const initialState: AuthState = {
  user: null,
  token: token || null,
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
