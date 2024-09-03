import axios from "axios";
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localStorageManager";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000/api",
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "Ok") {
    return response;
  }
  const originalRequest = response.config;
  const status = data.status;
  const error = data.error;

  //when refresh token is expired we had to log out the user
  if (
    status === 401 &&
    originalRequest.url ===
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
  ) {
    removeItem(KEY_ACCESS_TOKEN);
    window.location.replace("/login", "_self");
    return Promise.reject(error);
  }

  if (status === 401) {
    const response = await axiosClient.get("/auth/refresh");
    if (response.status === 200) {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;
      return axios(originalRequest);
    }
  }
  return Promise.reject(error);
});
