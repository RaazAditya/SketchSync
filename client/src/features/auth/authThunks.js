import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (idToken, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { idToken }
      );
      // store token locally

      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);
