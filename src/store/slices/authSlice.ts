import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../../interfaces";

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
