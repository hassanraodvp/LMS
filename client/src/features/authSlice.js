import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userloggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userloggedout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userloggedIn, userloggedout } = authSlice.actions;

export default authSlice.reducer;
