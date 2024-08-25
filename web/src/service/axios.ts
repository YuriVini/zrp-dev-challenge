import axios from "axios";

export const getEnvironment = () => {
  return {
    API_URL: String(import.meta.env.VITE_APP_API_URL),
  };

};

export const api = axios.create({
  baseURL: getEnvironment().API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((instanceConfig) => {
  const newInstance = instanceConfig;
  try {
    const token = localStorage.getItem("authToken");

    console.log("asdadasdad", token);
    if (token && newInstance.headers) {
      newInstance.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    console.log("Failed requesting")
  }

  return newInstance;
});
