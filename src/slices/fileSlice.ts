import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getListOfItems,
  DirectoryItemToDisplay,
} from "../services/directoryService";
import { RootState } from "../store";
import { getDefaultLibrary } from "../services/libraryService";
import { deleteFileByPath, downloadFileByPath } from "../services/fileService";

interface FilesState {
  data: DirectoryItemToDisplay[];
  loading: boolean;
  error: string | null;
}

const initialState: FilesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFiles = createAsyncThunk(
  "file/fetchFiles",
  async (_, { rejectWithValue }) => {
    try {
      const repo_Id = (await getDefaultLibrary()).repo_id;
      const items = await getListOfItems(repo_Id);
      return items;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (path: string, { rejectWithValue }) => {
    try {
      const repo_Id = (await getDefaultLibrary()).repo_id;
      await deleteFileByPath(repo_Id, path);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "file/downloadFile",
  async (path: string, { rejectWithValue }) => {
    try {
      const repo_Id = (await getDefaultLibrary()).repo_id;
      return await downloadFileByPath(repo_Id, path);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.name !== action.meta.arg);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fileSlice.reducer;
export const selectFile = (state: RootState) => state.file;
