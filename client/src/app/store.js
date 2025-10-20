import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import boardsReducer from "../features/boards/boardsSlice"; // 👈 new slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer, // 👈 added here
  },
});

export default store;
