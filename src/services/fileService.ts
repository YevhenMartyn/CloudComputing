import axios from "axios";
import { getAuthHeaders } from "./authenticationService";

export const deleteFileByPath = async (repo_id: string, path: string) => {
  const apiUrl = `api2/repos/${repo_id}/file/`;
  await axios.delete(`${apiUrl}/?p=${path}`, getAuthHeaders());
};

export const downloadFileByPath = async (repo_id: string, path: string) => {
  const apiUrl = `api2/repos/${repo_id}/file/`;
  const response = await axios.get(`${apiUrl}/?p=${path}`, getAuthHeaders());
  const link = document.createElement("a");
  link.href = response.data;
  link.setAttribute("download", path.split("/").pop() || "file"); // Set the file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
