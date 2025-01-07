const accessTokenStorageName = "token";

export const setAuthData = (token: string) => {
  localStorage.setItem(accessTokenStorageName, token);
};

export const getAccessToken = () =>
  localStorage.getItem(accessTokenStorageName);

export const clearAuthData = () => {
  localStorage.removeItem(accessTokenStorageName);
};
