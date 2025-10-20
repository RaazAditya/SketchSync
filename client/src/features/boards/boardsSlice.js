import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch user boards
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/boards`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 🔹 Create a new board with optional title
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({ title }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/boards`,
        { title }, // send title in body
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("boardslice ",res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // add new board at top
      });
  },
});

export default boardsSlice.reducer;
