import axios from "axios";
import { getAuthHeaders } from "./authenticationService";

interface DefaultLibraryData {
  repo_id: string;
  exists: boolean;
}

export type HistoryItem = {
  id: string;
  name: string;
  contact_email: string | null;
  time: string;
  description: string;
};

type HistoryResponse = {
  email: string;
  name: string;
  contact_email: string | null;
  time: string;
  commit_id: string;
  description: string;
  client_version: string | null;
  device_name: string | null;
  second_parent_id: string | null;
  tags: string[];
};

const mapToHistoryItem = (response: HistoryResponse): HistoryItem => ({
  id: response.commit_id,
  name: response.name,
  contact_email: response.contact_email,
  time: response.time,
  description: response.description,
});

export const getDefaultLibrary = async () => {
  const apiUrl = `api2/default-repo/`;
  const { data } = await axios.get<DefaultLibraryData>(
    apiUrl,
    getAuthHeaders()
  );
  return data;
};

export const getLibraryHistory = async (repo_id: string) => {
  const apiUrl = `api/v2.1/repos/${repo_id}/history/`;
  const response = await axios.get(apiUrl, getAuthHeaders());
  const data = response.data.data;
  return data.map(mapToHistoryItem);
};
