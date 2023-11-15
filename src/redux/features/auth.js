import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogged: false,
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      let user = action.payload;
      state.user = user;
      state.isUserLogged = true;
    },
    logOut: (state, action) => {
      state.isUserLogged = false;
      state.user = null;
    },
    makeSpin: (state, action) => {
      state.loading = true;
    },
    stopSpin: (state, action) => {
      state.loading = false;
    },
  },
});

export const { logIn, logOut, makeSpin, stopSpin } = authSlice.actions;
export default authSlice.reducer;
