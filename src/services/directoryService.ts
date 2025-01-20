import axios from "axios";
import { getAuthHeaders } from "./authenticationService";

type getListOfItemsResponse = {
  modifier_email: string;
  size: number;
  is_locked: boolean;
  lock_owner: string;
  lock_time: number;
  locked_by_me: string;
  type: string;
  name: string;
  id: string;
  mtime: number;
  permission: string;
  modifier_contact_email: string;
  modifier_name: string;
  starred: boolean;
};

export type DirectoryItemToDisplay = {
  id: string;
  name: string;
  modifier_contact_email: string;
  type: string;
  size: number;
};

const mapFirectoryToItemToDisplay = (
  response: getListOfItemsResponse
): DirectoryItemToDisplay => ({
  id: response.id,
  name: response.name,
  type: response.type,
  modifier_contact_email: response.modifier_contact_email,
  size: response.size,
});

export const getListOfItems = async (repo_id: string) => {
  const apiUrl = `api2/repos/${repo_id}/dir/`;
  const response = await axios.get(apiUrl, getAuthHeaders());
  return response.data.map(mapFirectoryToItemToDisplay);
};
