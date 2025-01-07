import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getDefaultLibrary,
  getLibraryHistory,
  HistoryItem,
} from "../services/libraryService";
import { RootState } from "../store";

interface HistoryState {
  data: HistoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const defaultLibrary = await getDefaultLibrary();
      if (defaultLibrary.exists) {
        const history = await getLibraryHistory(defaultLibrary.repo_id);
        return history;
      } else {
        throw new Error("Default library does not exist");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default historySlice.reducer;
export const selectHistory = (state: RootState) => state.history;
