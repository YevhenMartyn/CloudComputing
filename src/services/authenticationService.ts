import { LoginCredentials } from "../components/types/LoginCredentials";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface LoginResponse {
  token: string;
}

export const logIn = async (credentials: LoginCredentials) => {
  const apiUrl = `api2/auth-token/`;
  const { data } = await axios.post<LoginResponse>(apiUrl, {
    username: credentials.username,
    password: credentials.password,
  });
  return data;
};

export const useCurrentUser = () => {
  const userToken = useSelector((state: RootState) => state.auth.userToken);

  if (!userToken) {
    return { token: null };
  }
  return { token: userToken };
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
