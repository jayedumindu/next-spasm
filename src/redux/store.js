import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: authReducer,
});

export const useAppDispatch = () => useDispatch();
