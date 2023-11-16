import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogged: false,
  user: null,
  loading: false,
  tip: "",
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
    setSpinnerTip: (state, action) => {
      state.tip = action.payload;
    },
    makeSpin: (state, action) => {
      console.log("karakwwa");
      state.loading = true;
    },
    stopSpin: (state, action) => {
      console.log("nawattuwa");
      state.loading = false;
    },
  },
});

export const { logIn, logOut, makeSpin, stopSpin, setSpinnerTip } =
  authSlice.actions;
export default authSlice.reducer;
