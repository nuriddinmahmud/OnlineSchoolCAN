import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "https://shvfyrybczhiwfbaxkyu.supabase.co/functions/v1/student-api",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("API Request:", config.method?.toUpperCase(), config.url);
  console.log("API Request Headers:", config.headers);

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response Success:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "API Response Error:",
      error.response?.status,
      error.response?.data,
      error.config?.url
    );
    return Promise.reject(error);
  }
);
