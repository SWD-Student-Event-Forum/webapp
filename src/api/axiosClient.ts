import { getLocalToken } from "@/stores/auth";
import axios from "axios";
const baseURL = "https://eventzone.azurewebsites.net/api/v1";

//json
export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const jwt = getLocalToken().jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

//form data
export const axiosClientFormData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosClientFormData.interceptors.request.use((config) => {
  const jwt = getLocalToken().jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});
