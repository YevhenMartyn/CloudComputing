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
  link.setAttribute("download", path.split("/").pop() || "file");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getUploadLink = async (repo_id: string, path: string) => {
  const apiUrl = `api2/repos/${repo_id}/upload-link/`;
  const response = await axios.get(`${apiUrl}/?p=${path}`, getAuthHeaders());
  return response.data;
};

type FileUploadRequest = {
  file: File;
  parent_dir: string;
  replace: number;
  last_modify: number;
};

export const uploadFileToRepo = async (
  repo_id: string,
  path: string,
  file: File
) => {
  const uploadLink = await getUploadLink(repo_id, path);
  const formData = new FormData();
  const fileUploadRequest: FileUploadRequest = {
    file,
    parent_dir: path,
    replace: 0,
    last_modify: file.lastModified,
  };

  if (file.name.endsWith(".zip")) {
    console.log("File is a zip file");
  }

  formData.append("file", fileUploadRequest.file);
  formData.append("parent_dir", fileUploadRequest.parent_dir);
  formData.append("replace", fileUploadRequest.replace.toString());
  formData.append("last_modify", fileUploadRequest.last_modify.toString());
  const response = await axios.post(uploadLink, formData, {
    headers: {
      ...getAuthHeaders().headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
