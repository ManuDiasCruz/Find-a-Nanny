import axios from "axios";
import { getItem } from "./../utils/localStorage.js";

export const createConfig = () => {
  const token = getItem("user").token;

  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {};
};

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default api;
