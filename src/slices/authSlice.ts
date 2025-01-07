import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { LoginCredentials } from "../components/types/LoginCredentials";
import { logIn } from "../services/authenticationService";
import {
  setAuthData,
  getAccessToken,
  clearAuthData,
} from "../services/localStorageService";
import { RootState } from "../store";
import { PageRoute } from "../constants/PageRoutes";
import ErrorResponse from "../components/types/ErrorResponse";

interface LoginPayload {
  token: string;
}

export const userLogin = createAsyncThunk<
  LoginPayload,
  {
    credentials: LoginCredentials;
    navigate: NavigateFunction;
  }
>("auth/login", async ({ credentials, navigate }, { rejectWithValue }) => {
  try {
    const data = await logIn(credentials);
    const token = data.token;

    setAuthData(token);

    const loginPayload: LoginPayload = {
      token: data.token,
    };

    navigate(PageRoute.Home);
    return loginPayload;
  } catch (error) {
    const { response, message } = error as AxiosError<ErrorResponse>;
    if (response && response.data.message) {
      return rejectWithValue({
        message: response.data.message,
        errors: response.data.errors || [],
      });
    }
    return rejectWithValue({
      message: message,
      errors: response?.data?.errors || ["An unexpected error occurred."],
    });
  }
});

export const userLogout = createAsyncThunk(
  "auth/logout",
  async ({ navigate }: { navigate: NavigateFunction }) => {
    clearAuthData();
    navigate(PageRoute.Login);
  }
);

const userToken = getAccessToken();
interface AuthState {
  loading: boolean;
  userToken: string | null;
  error: ErrorResponse;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  userToken: userToken as string | null,
  error: {
    errors: [],
    message: "",
  },
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = {
          errors: [],
          message: "",
        };
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.token || null;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as ErrorResponse;
        state.success = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.userToken = null;
        state.error = {
          errors: [],
          message: "",
        };
        state.success = false;
      });
  },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
