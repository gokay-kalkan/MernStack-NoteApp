import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import notReducer from "../features/data/dataSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        notlar: notReducer,
    }
  });